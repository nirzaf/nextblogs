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
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received blog post data:', body);

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

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

    // Set default author if not provided
    if (!body.author) {
      body.author = {
        name: 'M.F.M Fazrin',
        image: '/default-avatar.jpg'
      };
    }

    // Set default cover image if not provided
    if (!body.coverImage) {
      body.coverImage = '/default-cover.jpg';
    }

    // Ensure tags is an array
    body.tags = body.tags || [];
    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }

    console.log('Processed blog data:', body);
    
    const blog = await Blog.create(body);
    console.log('Created blog:', blog);

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    
    const errorMessage = error.code === 11000 
      ? 'A blog with this slug already exists' 
      : error.message || 'Failed to create blog';
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
