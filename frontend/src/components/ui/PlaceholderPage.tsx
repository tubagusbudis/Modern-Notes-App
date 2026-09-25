export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <p className="text-sm text-secondary mt-1">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-subtle rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <h3 className="text-lg font-medium text-primary mb-1">Under Construction</h3>
        <p className="text-secondary text-sm max-w-sm">This page is part of the MVP scope but hasn't been fully implemented yet.</p>
      </div>
    </div>
  );
}
