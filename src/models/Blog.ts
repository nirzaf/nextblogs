import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IAuthor {
  name: string;
  image: string;
}

export interface IBlog extends Document {
  title: string;
  content: string;
  author: IAuthor;
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
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'] 
  },
  excerpt: { 
    type: String, 
    maxlength: [200, 'Excerpt cannot be more than 200 characters']
  },
  coverImage: { 
    type: String, 
    required: false
  },
  author: {
    name: { 
      type: String, 
      required: [true, 'Author name is required']
    },
    image: { 
      type: String,
      required: false
    }
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  tags: [{ 
    type: String 
  }]
}, {
  timestamps: true
});

// Create text indexes for search
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Update the updatedAt timestamp on save
BlogSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Check if the model exists before creating a new one
const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
