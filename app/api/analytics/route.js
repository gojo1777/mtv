import dbConnect from '../../../lib/mongodb'; // mongodb නම නිවැරදි කළා
import Stats from '../../../models/Stats';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await dbConnect();
    const today = new Date().toLocaleDateString('en-CA'); 
    await Stats.findOneAndUpdate(
      { date: today },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
