import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <Image
            src="https://ik.imagekit.io/quadrate/assets/QTS%20PNG.png?updatedAt=1732465331710"
            alt="Logo"
            width={88}
            height={24}
            className="w-24 object-contain cursor-pointer"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <Link href="/about" className="hover:text-gray-500">About</Link>
          <Link href="/contact" className="hover:text-gray-500">Contact</Link>
          <Link href="/write" className="text-white bg-black px-4 py-1 rounded-full hover:bg-gray-900">
            Write
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-black dark:text-white">
        <div className="flex items-center space-x-2 border rounded-full px-4 py-1 dark:border-gray-700">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none bg-transparent"
          />
        </div>
        <ThemeToggle />
        <button className="border px-4 py-1 rounded-full border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;