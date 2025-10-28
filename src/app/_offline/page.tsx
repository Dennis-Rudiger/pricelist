export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow">
      <h1 className="mb-2 text-2xl font-semibold text-gray-900">You’re offline</h1>
      <p className="mb-4 text-sm text-gray-600">
        It looks like your device doesn’t have an internet connection. You can still view any pages you visited
        before. When you’re back online, reload to get the latest data.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center rounded bg-brand px-4 py-2 text-white shadow transition hover:bg-brand-dark"
      >
        Retry
      </button>
    </div>
  );
}
