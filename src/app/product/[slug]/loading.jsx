export default function ProductLoading() {
  return (
    <div className="space-y-6 animate-pulse py-6">
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
