export default async function getCategories() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Categories load error:", err);
    return [];
  }
}
