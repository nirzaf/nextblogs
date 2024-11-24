'use client';

import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  coverImage: string;
  slug: string;
  createdAt: string;
  tags: string[];
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          title={blog.title}
          excerpt={blog.excerpt}
          author={{
            name: blog.author.name,
            image: blog.author.image || '/default-avatar.png' // Fallback image
          }}
          coverImage={blog.coverImage || '/default-cover.jpg'} // Fallback image
          date={blog.createdAt}
          slug={blog.slug}
        />
      ))}
    </div>
  );
}
