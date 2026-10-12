export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse py-6">
      {/* Ticker skeleton */}
      <div className="h-10 bg-white rounded-xl border border-gray-100" />

      {/* Hero skeleton */}
      <div className="h-64 bg-white rounded-3xl border border-gray-100" />

      {/* Grid skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100" />
        ))}
      </div>
    </div>
  );
}
