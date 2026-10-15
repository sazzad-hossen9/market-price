import { getProducts } from "../lib/api";
import MarqueePage from "./marquee";

export default async function TickerWrapper() {
  const products = await getProducts();

  if (!products || products.length === 0) return null;

  return <MarqueePage products={products} />;
}
