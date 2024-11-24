'use client';

import BlogList from "@/components/BlogList";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <Link
          href="/write"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Write New Post
        </Link>
      </div>
      <BlogList />
    </main>
  );
}
