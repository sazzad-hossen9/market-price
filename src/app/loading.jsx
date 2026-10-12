export default function Loading() {
  return (
    <div className="w-full">
      <div className="w-full h-10 bg-white border-y border-gray-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-pulse">
        <div className="h-64 bg-white rounded-3xl border border-gray-100" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
