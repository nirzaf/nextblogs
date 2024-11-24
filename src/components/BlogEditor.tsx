'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { FiImage } from 'react-icons/fi';

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
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    tags: initialData?.tags?.join(', ') || ''
  });

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        coverImage: formData.coverImage.trim() || undefined,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean),
        author: {
          name: 'M.F.M Fazrin',
          image: '/default-avatar.jpg'
        }
      };

      console.log('Submitting blog data:', blogData);

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create blog post');
      }

      console.log('Blog created successfully:', data);
      router.push(`/post/${data.slug}`);
      router.refresh();
    } catch (err) {
      console.error('Error creating blog:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      const newContent = formData.content.substring(0, start) + '    ' + formData.content.substring(end);
      setFormData({ ...formData, content: newContent });
      
      // Set cursor position after the inserted tabs
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  if (!mounted) {
    return null; // Return null on first render to avoid hydration mismatch
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mb-8">
        <input
          type="text"
          placeholder="Title"
          className="w-full text-4xl font-bold border-none outline-none bg-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          suppressHydrationWarning
        />
      </div>

      <div className="relative mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-white rounded-full border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <FiImage className="w-5 h-5" />
            <span>Add Cover Image</span>
          </button>
        </div>

        {showImageUpload && (
          <div className="mb-6">
            <ImageUpload
              currentImage={formData.coverImage}
              onImageUpload={(imageUrl) => {
                setFormData({ ...formData, coverImage: imageUrl });
                setShowImageUpload(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <textarea
          placeholder="Tell your story..."
          className="w-full min-h-[500px] text-lg leading-relaxed border-none outline-none bg-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          onKeyDown={handleKeyDown}
          suppressHydrationWarning
        />
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Add tags (comma-separated)"
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          suppressHydrationWarning
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.title.trim() || !formData.content.trim()}
            className="px-6 py-2 text-sm text-white bg-green-600 rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </form>
  );
}
