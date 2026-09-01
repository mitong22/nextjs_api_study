This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




// http://localhost:3000/api/books/genre/:genre

import { getDatabase } from "@/lib/mongodb";


// GET함수는 next.js의 정의된 함수
export async function GET(_request, {params}) {
  console.log("*************************")
  console.log(_request);
  // :genre를 전달 받으면, DB에서 해당 genre에 맞는 데이터들을 뽑아서 전달
  // 정렬은 title: 1. 

  const { genre } = await params; // params안에 있는 genre를 꺼냄 (promise 형태로 들어옴)
  // 구조 분해 할당이라고 함
  // params = {
  //  genre: 'fantasy'
  //}
  const db = await getDatabase(); // db 갖고오기
  const books = await db.collection('books').find({genre: genre}).sort({title: 1}).toArray();

  // toArray라서 이미 js배열 형태로 return하므로 JSON.stringfy로 출력하지않아도 됨
  // console.log(JSON.stringify(books));
  console.log(typeof(books));

  return Response.json({
    genre: genre, count: books.length, books: books
  });
}