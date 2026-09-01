
// http://localhost:3000/api/books/genre/:genre

import { getDatabase } from "@/lib/mongodb";

export async function GET(_request, {params}) {
  // :genre를 전달 받으면, DB에서 해당 genre에 맞는 데이터들을 뽑아서 전달
  // 정렬은 title: 1. 

  const { genre } = await params; // params안에 있는 genre를 꺼냄 (promise 형태로 들어옴)
  // 구조 분해 할당이라고 함
  // params = {
  //  genre: 'fantasy'
  //}
  const db = await getDatabase(); // db 갖고오기
  const books = await db.collection('books').find({genre: genre}).sort({title: 1}).toArray();

  return Response.json({
    genre, count: books.length, books
  });

}