// Import required libraries
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { QUERY } from "./graphql.js";
import fetch from 'node-fetch';
dotenv.config();


const writeSlugAndId = async () => {

    try {
        const parentDir = path.dirname(new URL(import.meta.url).pathname);

        console.log({ QUERY })
        const data = await fetch(
            `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}/`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${process.env.CONTENT_DELIVERY_ACCESS_TOKEN}`,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ query: QUERY }),
            }
        );

        if (data) {


            const { data: { portfolioCollection: { items } } } = await data.json();

            console.log(items)

            const arr = items.map(item => ({ id: item.sys.id, slug: item.slug }));

            const filePath = path.join(parentDir, "portfolio-items.json");

            await fs.writeFile(filePath, JSON.stringify(arr), err => {

                if (err) {
                    console.error("Error writing file:", err);
                } else {
                    console.log("Portfolio data written succesfully to " + filePath);
                }
            })
        }

    } catch (error) {
        console.error('Error making GraphQL query:', error);
    }
}

writeSlugAndId()