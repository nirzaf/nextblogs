import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { generateSlug, ensureUniqueSlug } from '@/lib/utils';

const DEFAULT_AUTHOR = {
    name: 'M.F.M Fazrin',
    image: 'https://ik.imagekit.io/fazrinphcc/myprofilepic - crropped.jpg?updatedAt=1725949317901'
};

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Received blog data:', body);

        await connectDB();

        // Generate and ensure unique slug
        const baseSlug = generateSlug(body.title);
        const slug = await ensureUniqueSlug(baseSlug);

        // Create excerpt if not provided
        const excerpt = body.excerpt || body.content
            .substring(0, 150)
            .replace(/[#*`]/g, '') // Remove markdown characters
            .trim() + '...';

        // Prepare blog data
        const blogData = {
            ...body,
            slug,
            excerpt,
            author: {
                name: body.author?.name || DEFAULT_AUTHOR.name,
                image: body.author?.image || DEFAULT_AUTHOR.image
            },
            coverImage: body.coverImage || '/default-cover.jpg',
            tags: Array.isArray(body.tags) ? body.tags : []
        };

        console.log('Creating blog with data:', blogData);
        const blog = await Blog.create(blogData);
        console.log('Blog created:', blog);

        return NextResponse.json(blog, { status: 201 });
    } catch (error: any) {
        console.error('Error creating blog:', error);
        
        const errorMessage = error.code === 11000 
            ? 'A blog with this slug already exists' 
            : error.message || 'Failed to create blog';
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
