import Image from 'next/image';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { validateImageUrl } from '@/lib/utils';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function BlogPost({ params }: PageProps) {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog) {
        notFound();
    }

    const formattedDate = format(new Date(blog.createdAt), 'MMMM dd, yyyy');
    const validatedCoverImage = await validateImageUrl(blog.coverImage);

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
            >
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back to all posts
            </Link>

            <div className="space-y-8">
                {/* Header */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold dark:text-white">
                        {blog.title}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <Image
                            src={blog.author?.image || DEFAULT_IMAGES.AUTHOR}
                            alt={blog.author?.name || 'Author'}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                        <div>
                            <p className="font-medium dark:text-white">{blog.author?.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
                    <Image
                        src={validatedCoverImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {blog.content}
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-6">
                        {blog.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
