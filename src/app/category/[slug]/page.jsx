import { getCategory, getProducts } from "../../../lib/api";
import { toBengali } from "../../../components/ProductCard";
import CategoryProducts from "./CategoryProducts";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  const products = await getProducts(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center text-3xl">
          {category?.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {category?.nameBn || "ক্যাটাগরি"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {toBengali(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts initialProducts={products} />
    </div>
  );
}
