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

const DEFAULT_AUTHOR = {
  name: 'M.F.M Fazrin',
  image: 'https://ik.imagekit.io/fazrinphcc/myprofilepic - crropped.jpg?updatedAt=1725949317901'
};

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
    default: '/default-cover.jpg'
  },
  author: {
    name: { 
      type: String, 
      required: [true, 'Author name is required'], 
      default: DEFAULT_AUTHOR.name
    },
    image: { 
      type: String, 
      default: DEFAULT_AUTHOR.image 
    }
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  tags: [{ 
    type: String, 
    default: [] 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
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

// Use existing model or create new one
export default models.Blog || model<IBlog>('Blog', BlogSchema);
