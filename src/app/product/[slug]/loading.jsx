export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
      <div className="h-4 w-48 bg-gray-200 rounded" />
      <div className="h-44 bg-white rounded-3xl border border-gray-100" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 bg-white rounded-2xl border border-gray-100" />
        <div className="h-28 bg-white rounded-2xl border border-gray-100" />
        <div className="h-28 bg-white rounded-2xl border border-gray-100" />
      </div>
      <div className="h-64 bg-white rounded-3xl border border-gray-100" />
    </div>
  );
}
