import { getDetailBook } from "@/app/lib/cms-micro/client";
import Image from "next/image";
import React from "react";

// eslint-disable-next-line @next/next/no-async-client-component
const DetailBook = async ({ params }: { params: { id: string } }) => {
    console.log(params.id);
    const book = await getDetailBook(params.id);
    console.log(book);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                    src={book.thumnail.url}
                    className="w-full h-80 object-cover object-center"
                    alt={book.title}
                    width={700}
                    height={700}
                />
                <div className="p-4">
                    <h2 className="text-2xl font-bold">{book.title}</h2>
                    <div
                        className="text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{ __html: book.content }}
                    />

                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                            公開日:{new Date(book.publishedAt as any).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                            最終更新:{new Date(book.updatedAt).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBook;