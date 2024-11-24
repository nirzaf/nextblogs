import { DEFAULT_IMAGES } from './constants';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Only use this function server-side
export async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  if (typeof window !== 'undefined') {
    throw new Error('ensureUniqueSlug can only be used on the server side');
  }
  
  const Blog = (await import('@/models/Blog')).default;
  let slug = baseSlug;
  let counter = 1;
  let exists = true;

  // Keep checking until we find a unique slug
  while (exists) {
    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      exists = false;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return slug;
}

export async function validateImageUrl(url: string | undefined | null): Promise<string> {
  // If URL is empty or undefined, return default cover image
  if (!url) {
    return DEFAULT_IMAGES.COVER;
  }

  // If it's a local image from public folder, return as is
  if (url.startsWith('/')) {
    return url;
  }

  try {
    // Try to fetch the image headers to check if it exists and is an image
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
      return DEFAULT_IMAGES.COVER;
    }
    return url;
  } catch (error) {
    // If there's any error (network, invalid URL, etc.), return default image
    return DEFAULT_IMAGES.COVER;
  }
}
