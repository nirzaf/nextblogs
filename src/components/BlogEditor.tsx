'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { DEFAULT_AUTHOR, DEFAULT_IMAGES } from '@/lib/constants';

const ImageUpload = dynamic(() => import('./ImageUpload'), { ssr: false });

interface BlogEditorProps {
    initialData?: {
        title: string;
        content: string;
        coverImage?: string;
        tags?: string[];
    };
}

export default function BlogEditor({ initialData }: BlogEditorProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || DEFAULT_IMAGES.COVER);
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);
    const [error, setError] = useState('');

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    coverImage,
                    tags,
                    author: DEFAULT_AUTHOR
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create blog post');
            }

            router.push(`/post/${data.slug}`);
        } catch (err) {
            console.error('Error creating blog:', err);
            setError(err instanceof Error ? err.message : 'Failed to create blog post');
        } finally {
            setIsSubmitting(false);
        }
    }, [title, content, coverImage, tags, router, isSubmitting]);

    const handleTagInput = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (e.key === 'Enter' && input.value.trim()) {
            e.preventDefault();
            const newTag = input.value.trim();
            if (!tags.includes(newTag)) {
                setTags(prev => [...prev, newTag]);
            }
            input.value = '';
        }
    }, [tags]);

    const removeTag = useCallback((tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    }, []);

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {/* Title Input */}
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your title"
                    className="w-full text-4xl font-bold border-none focus:outline-none focus:ring-0 bg-transparent placeholder-gray-400 dark:text-white"
                    required
                />
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-4">
                <ImageUpload
                    onImageUpload={setCoverImage}
                    currentImage={coverImage}
                />
                {coverImage && (
                    <div className="relative w-full h-[40vh]">
                        <Image
                            src={coverImage}
                            alt="Cover"
                            fill
                            className="object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={() => setCoverImage(DEFAULT_IMAGES.COVER)}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Content Editor */}
            <div className="min-h-[400px]">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your story..."
                    className="w-full h-full min-h-[400px] text-lg border-none focus:outline-none focus:ring-0 bg-transparent placeholder-gray-400 dark:text-white resize-none"
                    required
                />
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 inline-flex items-center"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    onKeyDown={handleTagInput}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white"
                />
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Publishing...' : 'Publish'}
                </button>
            </div>
        </form>
    );
}
