'use server';

import {
  createPost,
  updatePost,
  deletePost,
  togglePostStatus,
  likePost,
  resetToDemoData,
  getPostById,
} from '@/lib/blogs';
import { ActionResponse, BlogCategory, BlogStatus } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPostAction(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const title = (formData.get('title') as string || '').trim();
  const excerpt = (formData.get('excerpt') as string || '').trim();
  const content = (formData.get('content') as string || '').trim();
  const category = (formData.get('category') as BlogCategory) || 'Engineering';
  const authorName = (formData.get('authorName') as string || 'Harsh Vardhan').trim();
  const authorRole = (formData.get('authorRole') as string || 'Full-Stack Developer').trim();
  const coverImage = (formData.get('coverImage') as string || '').trim();
  const tagsRaw = (formData.get('tags') as string || '').trim();
  const status = (formData.get('status') as BlogStatus) || 'draft';
  const featured = formData.get('featured') === 'on' || formData.get('featured') === 'true';

  // Validation
  const errors: Record<string, string[]> = {};

  if (!title || title.length < 5) {
    errors.title = ['Title must be at least 5 characters long.'];
  }
  if (!excerpt || excerpt.length < 10) {
    errors.excerpt = ['Excerpt must be at least 10 characters long.'];
  }
  if (!content || content.length < 20) {
    errors.content = ['Content must be at least 20 characters long.'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve form validation errors.',
      errors,
    };
  }

  // Generate slug
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);
  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

  // Calculate reading time (~200 wpm)
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const tags = tagsRaw
    ? tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : ['Tech', category];

  const defaultCover =
    coverImage ||
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80';

  const post = await createPost({
    slug,
    title,
    excerpt,
    content,
    category,
    author: {
      name: authorName,
      role: authorRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    tags,
    coverImage: defaultCover,
    status,
    featured,
    readingTimeMinutes,
  });

  revalidatePath('/');
  revalidatePath('/blogs');
  revalidatePath('/dashboard');

  return {
    success: true,
    message: 'Blog post created successfully!',
    post,
  };
}

export async function updatePostAction(
  id: string,
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const existing = await getPostById(id);
  if (!existing) {
    return {
      success: false,
      message: 'Post not found',
    };
  }

  const title = (formData.get('title') as string || '').trim();
  const excerpt = (formData.get('excerpt') as string || '').trim();
  const content = (formData.get('content') as string || '').trim();
  const category = (formData.get('category') as BlogCategory) || existing.category;
  const authorName = (formData.get('authorName') as string || existing.author.name).trim();
  const authorRole = (formData.get('authorRole') as string || existing.author.role).trim();
  const coverImage = (formData.get('coverImage') as string || existing.coverImage).trim();
  const tagsRaw = (formData.get('tags') as string || '').trim();
  const status = (formData.get('status') as BlogStatus) || existing.status;
  const featured = formData.get('featured') === 'on' || formData.get('featured') === 'true';

  const errors: Record<string, string[]> = {};
  if (!title || title.length < 5) {
    errors.title = ['Title must be at least 5 characters long.'];
  }
  if (!excerpt || excerpt.length < 10) {
    errors.excerpt = ['Excerpt must be at least 10 characters long.'];
  }
  if (!content || content.length < 20) {
    errors.content = ['Content must be at least 20 characters long.'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve form validation errors.',
      errors,
    };
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : existing.tags;

  const updated = await updatePost(id, {
    title,
    excerpt,
    content,
    category,
    author: {
      ...existing.author,
      name: authorName,
      role: authorRole,
    },
    coverImage,
    tags,
    status,
    featured,
    readingTimeMinutes,
  });

  revalidatePath('/');
  revalidatePath('/blogs');
  revalidatePath(`/blogs/${existing.slug}`);
  revalidatePath('/dashboard');

  return {
    success: true,
    message: 'Post updated successfully!',
    post: updated || undefined,
  };
}

export async function deletePostAction(id: string): Promise<{ success: boolean; message: string }> {
  const post = await getPostById(id);
  const success = await deletePost(id);
  
  if (success) {
    revalidatePath('/');
    revalidatePath('/blogs');
    if (post) {
      revalidatePath(`/blogs/${post.slug}`);
    }
    revalidatePath('/dashboard');
    return { success: true, message: 'Post successfully deleted.' };
  }
  return { success: false, message: 'Could not delete post.' };
}

export async function togglePublishAction(id: string): Promise<{ success: boolean; status?: BlogStatus }> {
  const updated = await togglePostStatus(id);
  if (updated) {
    revalidatePath('/');
    revalidatePath('/blogs');
    revalidatePath(`/blogs/${updated.slug}`);
    revalidatePath('/dashboard');
    return { success: true, status: updated.status };
  }
  return { success: false };
}

export async function likePostAction(id: string): Promise<{ success: boolean; likes: number }> {
  const count = await likePost(id);
  if (count !== null) {
    const post = await getPostById(id);
    if (post) {
      revalidatePath(`/blogs/${post.slug}`);
    }
    revalidatePath('/blogs');
    revalidatePath('/dashboard');
    return { success: true, likes: count };
  }
  return { success: false, likes: 0 };
}

export async function resetDemoAction(): Promise<{ success: boolean; message: string }> {
  await resetToDemoData();
  revalidatePath('/');
  revalidatePath('/blogs');
  revalidatePath('/dashboard');
  return { success: true, message: 'Reset to sample demo posts.' };
}
