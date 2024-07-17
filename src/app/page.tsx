import Book from "./components/Book"; 
import { getAllBooks } from "./lib/cms-micro/client";
import { BookType } from "./types/types";



export default async function Home() {

  const {contents} = await getAllBooks();

  return (
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book key={book.id} book={book} />
        ))}
      </main>
  );
}

