import React from 'react';
import type { Metadata } from 'next';
import { PostForm } from '@/components/PostForm';

export const metadata: Metadata = {
  title: 'Create New Article',
  description: 'Draft and publish a new blog article with React 19 form actions.',
};

export default function NewPostPage() {
  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      <PostForm />
    </div>
  );
}
