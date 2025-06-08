import mongoose from 'mongoose';
import GitHubSlugger from 'github-slugger';

const slugger = new GitHubSlugger();

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  tags: {
    type: [String],
    default: [],
  },
  slug: {
    type: String,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, 
{
  timestamps: true,
  versionKey: false,
});

// create a slug on new note or title change
noteSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('title')) {
    this.slug = slugger.slug(this.title);
  }
  next();
});

export default mongoose.model('Note', noteSchema);
