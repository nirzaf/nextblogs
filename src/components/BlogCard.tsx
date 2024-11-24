'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { validateImageUrl } from '@/lib/utils';
import { DEFAULT_IMAGES } from '@/lib/constants';

interface BlogCardProps {
  title: string;
  excerpt?: string;
  coverImage?: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  author,
  createdAt,
  slug,
}: BlogCardProps) {
  const [validatedCoverImage, setValidatedCoverImage] = useState(DEFAULT_IMAGES.COVER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    validateImageUrl(coverImage).then(setValidatedCoverImage);
  }, [coverImage]);

  if (!mounted) return null;

  return (
    <Link href={`/post/${slug}`} className="group">
      <article className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={validatedCoverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4 sm:p-6">
          <time
            dateTime={createdAt}
            className="block text-xs text-gray-500 dark:text-gray-400"
          >
            {format(new Date(createdAt), 'MMMM d, yyyy')}
          </time>

          <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>

          {excerpt && (
            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-300">
              {excerpt}
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-8 w-8 rounded-full">
              <Image
                src={author.image || DEFAULT_IMAGES.AUTHOR}
                alt={author.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {author.name}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
