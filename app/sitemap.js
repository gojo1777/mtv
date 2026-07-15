// මේ පේළි දෙක අනිවාර්යයි
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap() {
  const baseUrl = 'https://movie-web-rust-eight.vercel.app';
  
  let movies = [];
  try {
    // API එකෙන් ඩේටා ගන්නා විට cache එක කළමනාකරණය කිරීම
    const res = await fetch(`${baseUrl}/api/movies`, { 
      next: { revalidate: 60 } 
    });
    
    if (res.ok) {
      movies = await res.json();
    }
  } catch (error) {
    console.error("Sitemap Fetch Error:", error);
  }

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/movies`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  const dynamicMoviePages = (Array.isArray(movies) ? movies : []).map((movie) => ({
    url: `${baseUrl}/movie/${movie._id}`, 
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...dynamicMoviePages];
}
