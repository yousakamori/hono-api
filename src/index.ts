import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { products } from "./db/schema";

const app = new Hono();

app.get("/", async (c) => {
  // @ts-expect-error
  const sql = neon(`${c.env.DATABASE_URL}`);
  const db = drizzle(sql);
  const allProducts = await db.select().from(products);

  return c.json(allProducts);
});

export default app;
