import { getCategories } from "@/lib/api";
import NavbarClient from "./NavbarClient";
// import getCategories from "@/service/categoties";

export default async function Navbar() {
  const categories = await getCategories();
  return <NavbarClient categories={categories} />;
}
