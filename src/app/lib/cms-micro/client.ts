import { MicroCMSListResponse, createClient } from "microcms-js-sdk";
import {BookType} from "@/app/types/types"

const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

console.log("Service Domain:", serviceDomain);
console.log("API Key:", apiKey);

if (!serviceDomain || !apiKey) {
    throw new Error("Environment variables are not set correctly.");
}



export const getAllBooks = async ():Promise<MicroCMSListResponse<BookType>> => {
    const client = createClient({
        serviceDomain: serviceDomain!,
        apiKey: apiKey!,
    });
    try {
        console.log("Fetching all books...");
        const allBooks = await client.getList<BookType>({
            endpoint: "bookcommerce", 
        });
        console.log("Fetched books response:", allBooks);
        return allBooks;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};
