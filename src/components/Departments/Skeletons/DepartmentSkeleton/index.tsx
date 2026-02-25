const DepartmentSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-pulse">
    {/* Image Placeholder */}
    <div className="h-48 w-full bg-gray-200" />

    <div className="p-6">
      {/* Title Placeholder */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

      {/* Description Placeholders */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>

      {/* Stats Placeholders */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded w-10" />
          <div className="h-5 bg-gray-200 rounded w-8" />
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-100 rounded w-10" />
          <div className="h-5 bg-gray-200 rounded w-8" />
        </div>
      </div>
    </div>
  </div>
);

export default DepartmentSkeleton;
