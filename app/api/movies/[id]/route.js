import dbConnect from '../../../../lib/mongodb';
import Movie from '../../../../models/Movie';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const movie = await Movie.findById(id).lean();
    
    if (!movie) {
      return new Response(JSON.stringify({ error: 'Movie not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Increment views
    await Movie.findByIdAndUpdate(id, { $inc: { views: 1 } });
    
    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch movie' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const movie = await Movie.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!movie) {
      return new Response(JSON.stringify({ error: 'Movie not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating movie:', error);
    return new Response(JSON.stringify({ error: 'Failed to update movie' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const movie = await Movie.findByIdAndDelete(id);
    
    if (!movie) {
      return new Response(JSON.stringify({ error: 'Movie not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ message: 'Movie deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete movie' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
