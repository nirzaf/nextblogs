'use client';

import BlogEditor from '@/components/BlogEditor';

export default function WritePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogEditor />
    </div>
  );
}
