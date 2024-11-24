import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  excerpt: { 
    type: String, 
    required: true 
  },
  coverImage: { 
    type: String 
  },
  tags: [{ 
    type: String 
  }]
}, {
  timestamps: true
});

// Add text index for search functionality
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
