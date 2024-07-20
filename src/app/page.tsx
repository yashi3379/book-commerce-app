import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/cms-micro/client";
import { BookType,Purchase,User } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {

  const { contents } = await getAllBooks();

  //サーバーサイドでセッション情報を取得する
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchasedBookIds:Purchase;

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      {cache: "no-store"}
    );
    const purchasesData = await response.json();
    console.log(purchasesData);

    purchasedBookIds = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    )

  }




  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Book Commerce
      </h2>
      {contents.map((book: BookType) => (
        <Book
          key={book.id}
          book={book}
          isPurchased={purchasedBookIds.includes(book.id)}
        />
      ))}
    </main>
  );
}

