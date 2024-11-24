'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface BlogEditorProps {
  initialData?: {
    title: string;
    content: string;
    coverImage: string;
    tags: string[];
  };
  isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    tags: initialData?.tags?.join(', ') || ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          author: {
            name: 'M.F.M Fazrin', // You might want to make this dynamic
            image: '/avatar.jpg'   // You might want to make this dynamic
          }
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create blog post');
      }

      const blog = await response.json();
      router.push(`/post/${blog.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Content (Markdown supported)
        </label>
        <textarea
          id="content"
          required
          rows={15}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Cover Image URL
        </label>
        <input
          type="url"
          id="coverImage"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="nextjs, react, mongodb"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
