import dbConnect from '../../../lib/mongodb';
import Movie from '../../../models/Movie';

export const dynamic = 'force-dynamic'; 

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');
    
    let query = {};
    
    // 🔍 Language Filter එක Update කළා
    if (lang) {
      if (lang === 'dub') {
        query.language = { $in: ['Sinhala Dub', 'Both'] };
      } else if (lang === 'sub') {
        // මෙතනට 'Sinhala Sub Anime' ඇතුළත් කළ නිසා දැන් හෝම් පේජ් එකේ පේනවා
        query.language = { $in: ['Sinhala Sub', 'Both', 'Sinhala Sub Anime'] };
      }
    }
    
    if (genre) {
      query.genre = genre;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { sinhalaTitle: { $regex: search, $options: 'i' } },
      ];
    }
    
    const movies = await Movie.find(query).sort({ createdAt: -1 }).lean();
    
    return new Response(JSON.stringify(movies), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch movies' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // API එක හරහා Episode Array එක එන නිසා ඒකත් එක්කම create වෙනවා
    const movie = await Movie.create(body);
    
    return new Response(JSON.stringify(movie), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating movie:', error);
    return new Response(JSON.stringify({ error: 'Failed to create movie' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
