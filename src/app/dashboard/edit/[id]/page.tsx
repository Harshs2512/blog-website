import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/blogs';
import { PostForm } from '@/components/PostForm';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `Edit: ${post.title}`,
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  // In Next.js 15 & 16, params is a Promise
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      <PostForm post={post} />
    </div>
  );
}
