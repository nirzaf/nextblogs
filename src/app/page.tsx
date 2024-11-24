import Image from "next/image";
import BlogCard from "@/components/BlogCard";

// Temporary mock data
const mockPosts = [
  {
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to build modern web applications with Next.js 14. We'll cover the new features, best practices, and how to get started with your first project.",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2024-03-24",
    slug: "getting-started-with-nextjs-14"
  },
  {
    title: "The Future of Web Development",
    excerpt: "Explore the latest trends and technologies shaping the future of web development. From AI integration to serverless architecture, discover what's next.",
    author: {
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2024-03-23",
    slug: "future-of-web-development"
  },
  {
    title: "Building Scalable Applications",
    excerpt: "Learn the principles and practices of building scalable applications. From architecture decisions to deployment strategies, we cover it all.",
    author: {
      name: "Mike Johnson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2024-03-22",
    slug: "building-scalable-applications"
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </section>

      {/* Featured Posts */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Get the latest posts delivered right to your inbox. No spam, unsubscribe at any time.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-l text-black focus:outline-none"
          />
          <button className="bg-white text-black px-6 py-2 rounded-r hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
