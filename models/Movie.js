import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'English title is required'],
    trim: true,
  },
  sinhalaTitle: {
    type: String,
    required: [true, 'Sinhala title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String], 
    required: true,
  },
  language: {
    type: String,
    enum: ['Sinhala Dub', 'Sinhala Sub', 'Both', 'Sinhala Sub Anime'],
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  trailerUrl: {
    type: String,
    default: '',
  },
  downloadLinks: [{
    quality: String,
    size: String,
    url: String,       // backward compat
    gdrive: String,
    telegram: String,
    direct: String,
    pixeldrain: String,
    other: String,
  }],
  // 🟢 SRT Subtitle file link
  subtitleUrl: {
    type: String,
    default: '',
  },
  episodes: [{
    number: String,
    title: String,
    quality: String,
    url: String,       // backward compat (anime)
    gdrive: String,
    telegram: String,
    direct: String,
    pixeldrain: String,
    other: String,
  }],
  streamingUrl: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Movie', 'Cartoon', 'Anime', 'Series'],
    default: 'Movie',
  },
  ageRating: {
    type: String,
    enum: ['All', '13+', '16+', '18+'],
    default: 'All',
  },
  views: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, { 
  timestamps: true 
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);

export default Movie;
