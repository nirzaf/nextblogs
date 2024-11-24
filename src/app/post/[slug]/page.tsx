import Image from 'next/image';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';

async function getBlogBySlug(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug });
  if (!blog) return null;
  return blog.toObject();
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Image
              src={blog.author.image || '/default-avatar.jpg'}
              alt={blog.author.name}
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <span>{blog.author.name}</span>
          </div>
          <span>•</span>
          <time dateTime={blog.createdAt}>
            {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
          </time>
        </div>
      </header>

      {blog.coverImage && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {blog.content}
      </div>

      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
