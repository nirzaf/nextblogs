import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: {
    name: string;
    image: string;
  };
  coverImage: string;
  date: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, author, coverImage, date, slug }: BlogCardProps) => {
  return (
    <Link href={`/post/${slug}`}>
      <article className="group cursor-pointer border rounded-lg overflow-hidden">
        <div className="relative w-full h-60">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src={author.image}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 group-hover:text-gray-700">
            {title}
          </h2>
          <p className="text-gray-500 line-clamp-3">{excerpt}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Read more</span>
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
