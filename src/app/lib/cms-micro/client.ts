import { createClient } from "microcms-js-sdk";
import { BookType } from "@/app/types/types"

const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;


if (!serviceDomain || !apiKey) {
    throw new Error("Environment variables are not set correctly.");
}

export const client = createClient({
    serviceDomain: serviceDomain!,
    apiKey: apiKey!,
});

export const getAllBooks = async () => {
    try {
        console.log("Fetching all books...");
        const allBooks = await client.getList<BookType>({
            endpoint: "bookcommerce",
        });
        return allBooks;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

export const getDetailBook = async (contentId: string) => {
    const detailBook = await client.getListDetail<BookType>({
        endpoint: "bookcommerce",
        contentId,
    });
    return detailBook;
}