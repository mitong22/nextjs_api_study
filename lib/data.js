import { connection } from "next/server";
import { getDb } from "@/lib/mongodb";

// .mapper
export async function getProductsByCategory(category) {
  await connection();

  const filter = category === "all" ? {} : { category };

  const db = await getDb();
  const products = await db.collection("products").find(filter).sort({ name: 1 }).toArray();

  return products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description,
  }));
}

export async function getPosts() {
  await connection();

  const db = await getDb();
  const posts = await db.collection("posts").find().sort({ createdAt: -1 }).limit(20).toArray();

  return posts.map((post) => ({
    id: post._id.toString(),
    author: post.author,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
  }));
}

export async function getBooks() {
  await connection();

  const db = await getDb();
  const books = await db.collection("books").find().sort({ title: 1 }).toArray();

  return books.map((book) => ({
    id: book._id.toString(),
    title: book.title,
    author: book.author,
    topic: book.topic,
    description: book.description,
  }));
}