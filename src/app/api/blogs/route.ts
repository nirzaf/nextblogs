import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { generateSlug, ensureUniqueSlug } from '@/lib/utils';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    
    // Generate and ensure unique slug
    const baseSlug = generateSlug(body.title);
    body.slug = await ensureUniqueSlug(baseSlug);
    
    // Create excerpt if not provided
    if (!body.excerpt && body.content) {
      body.excerpt = body.content
        .substring(0, 150)
        .replace(/[#*`]/g, '') // Remove markdown characters
        .trim() + '...';
    }
    
    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    const errorMessage = error.code === 11000 
      ? 'A blog with this slug already exists' 
      : 'Failed to create blog';
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
