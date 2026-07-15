import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // "2024-05-20" format එකට
  views: { type: Number, default: 0 }
});

export default mongoose.models.Stats || mongoose.model('Stats', StatsSchema);
