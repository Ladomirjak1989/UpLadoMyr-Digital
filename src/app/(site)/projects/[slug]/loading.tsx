export default function LoadingProject() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="h-6 w-56 bg-gray-200 animate-pulse rounded mb-4" />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded-lg" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}
