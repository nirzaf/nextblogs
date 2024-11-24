import Blog from '@/models/Blog';

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

export async function ensureUniqueSlug(baseSlug: string): Promise<string> {
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
