import dbConnect from '../../../lib/mongodb'; 
import Movie from '../../../models/Movie'; 
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const movieCount = await Movie.countDocuments();
    return new Response(JSON.stringify({ totalMovies: movieCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ totalMovies: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
