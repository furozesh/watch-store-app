export default function ProductCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 animate-pulse">

      <div className="w-full h-60 rounded-lg bg-gray-200" />

      <div className="h-7 w-2/3 rounded bg-gray-200" />

      <div className="h-5 w-24 rounded bg-gray-200" />

      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
      </div>

      <div className="h-7 w-32 rounded bg-gray-200" />

      <div className="h-11 rounded-lg bg-gray-300" />

      <div className="h-5 w-24 rounded bg-gray-200" />

    </div>
  );
}