import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-[calc(100vh-110px)] flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-7xl text-[#0f2d6b] font-bold">
          404
        </h1>

        <h2 className="text-3xl mt-4 font-semibold">
          صفحه پیدا نشد
        </h2>

        <p className="text-gray-500 mt-3">
          صفحه‌ای که به دنبال آن هستید وجود ندارد.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-[#0f2d6b] text-white px-6 py-3 rounded-lg"
        >
          بازگشت به صفحه اصلی
        </Link>

      </div>
    </main>
  );
}