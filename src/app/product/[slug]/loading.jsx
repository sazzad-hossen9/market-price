export default function ProductLoading() {
  return (
    <div className="space-y-6 animate-pulse py-6">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 bg-gray-200 rounded" />

      {/* Product header skeleton */}
      <div className="h-44 bg-white rounded-3xl border border-gray-100" />

      {/* Summary cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 bg-white rounded-2xl border border-gray-100" />
        <div className="h-28 bg-white rounded-2xl border border-gray-100" />
        <div className="h-28 bg-white rounded-2xl border border-gray-100" />
      </div>

      {/* Table skeleton */}
      <div className="h-64 bg-white rounded-3xl border border-gray-100" />
    </div>
  );
}
