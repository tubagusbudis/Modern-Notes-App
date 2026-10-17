export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">{title}</h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-black rounded-3xl bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
        <div className="w-16 h-16 bg-[#FFE066] border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-2xl flex items-center justify-center mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <h3 className="text-xl font-black text-black dark:text-white mb-1.5 tracking-tight">Under Construction</h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-sm max-w-sm">This page is part of the MVP scope but hasn't been fully implemented yet.</p>
      </div>
    </div>
  );
}
