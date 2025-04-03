import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "Products & Business News",
  description: "Browse our products and latest business news",
};

const productUrl = process.env._NEXT_URL;
const token = process.env._NEXT_TOKIN;

async function getProducts() {
  // Adjust this URL as needed; here we assume your API expects a query param for token
  const res = await fetch(`${productUrl}=${token}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.data || [];
}

async function getNews() {
  const newsUrl = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5add98c5d7184d728bf3366cd4ec78ce";
  const res = await fetch(newsUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch news articles");
  }
  const data = await res.json();
  return data.articles || [];
}

export default async function Page() {
  // Fetch products and news concurrently
  const [products, news] = await Promise.all([getProducts(), getNews()]);

  return (
    <div className="p-4 bg-white">
      {/* Products Section */}
      <section>
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">
          Products
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.documentId}
                className="rounded-xl w-80 transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                {/* Product Image */}
                <Image
                  src={`http://127.0.0.1:1337${product.image.url || "/placeholder.jpg"}`}
                  width={320}
                  height={200}
                  className="w-full h-48"
                  alt={product.title}
                  unoptimized
                />
                {/* Product Content */}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-purple-700">
                    {product.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {product.descrption.substring(0, 100)}...
                  </p>
                </div>
                {/* Interaction Buttons */}
                <div className="flex justify-between items-center p-4 border-t">
                  <Link
                    href={`/posts/${product.documentId}`}
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Read more →
                  </Link>
                  <button className="bg-green-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-green-700 transition">
                    ❤️ {product.likes}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products available.</p>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="mt-12">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">
          Business News
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map((article, index) => (
              <div
                key={index}
                className="border rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden"
              >
                {article.urlToImage ? (
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-purple-700">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {article.description
                      ? article.description.substring(0, 100) + "..."
                      : "No description available."}
                  </p>
                </div>
                <div className="p-4 border-t flex justify-end">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No news articles available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
