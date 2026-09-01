/* http://localhost:3000/api/movies/year/2024

*/
import { getDb } from "@/lib/mongodb";

export async function GET(request, {params}) {

  const { year } = await params;
  const db = await getDb();

  const movies = await db.collection('movies').find({year: parseInt(year)}).sort({}).toArray();

  console.log(movies);

  return Response.json({
    movies: movies
  });
  
}
