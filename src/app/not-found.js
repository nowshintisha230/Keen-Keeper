import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl flex flex-col items-center justify-center bg-gray-100 text-center m-5 p-6">
      
      <h1 className="text-6xl font-bold text-red-600">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist 😢
      </p>

      <Link
        href="/"
        className="mt-6 bg-gray-800 text-white px-5 py-2 rounded-xl hover:bg-gray-900"
      >
        Go Home
      </Link>
    </div>
  );
}