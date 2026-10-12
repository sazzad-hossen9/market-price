import baseUrl from "../service/baseUrl";

// get all categories
export async function getCategories() {
  try {
    const res = await fetch(`${baseUrl}/categories`);
    return await res.json();
  } catch (err) {
    return [];
  }
}

// get single category by slug
export async function getCategory(slug) {
  try {
    const res = await fetch(`${baseUrl}/categories/${slug}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}

// get all products or filter by category
export async function getProducts(categorySlug = "") {
  try {
    const url = categorySlug
      ? `${baseUrl}/products?category=${categorySlug}`
      : `${baseUrl}/products`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return [];
  }
}

// get single product by slug or id
export async function getProduct(slugOrId) {
  try {
    // if numeric id
    if (!isNaN(slugOrId)) {
      const res = await fetch(`${baseUrl}/products/${slugOrId}`);
      return await res.json();
    }
    // if slug
    const res = await fetch(`${baseUrl}/products?slug=${slugOrId}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return data;
  } catch (err) {
    return null;
  }
}
