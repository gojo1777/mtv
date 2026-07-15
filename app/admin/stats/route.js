import dbConnect from '../../../lib/mongodb'; 
import Stats from '../../../models/Stats'; 
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const allStats = await Stats.find().sort({ date: -1 }).limit(10);
    const totalResult = await Stats.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    
    const data = {
      daily: allStats,
      totalViews: totalResult[0]?.total || 0
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ daily: [], totalViews: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
