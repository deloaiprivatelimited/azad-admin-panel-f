import React, { useEffect, useState } from 'react';
import { Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: string;
  thumbnail_url: string;
  book_name: string;
  author: string;
  price: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  items: Book[];
}

export function BooksPage() {

  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://api.srinivasiasacademy.in/books/items');
        if (!response.ok) throw new Error('Failed to fetch books');

        const data: ApiResponse = await response.json();
        setBooks(data.items);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-2xl sm:text-3xl text-gray-600">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-xl sm:text-2xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Books Published
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our collection of educational books authored by experts.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Book Image */}
              <div className="relative">
                <img
                  src={book.thumbnail_url}
                  alt={book.book_name}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                />
              </div>

              {/* Book Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  {book.book_name}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Author: {book.author}
                </p>

                {/* Book Stats */}
                <div className="flex items-center justify-between mb-4 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Updated {new Date(book.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    ₹{book.price.toLocaleString()}
                  </span>

                  <a
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center text-sm sm:text-base transition-colors"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-900 rounded-xl p-6 sm:p-10 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Need Books for Your Institution?
          </h2>
          <p className="text-lg sm:text-xl mb-6">
            Contact us for bulk orders and special pricing for coaching centers.
          </p>

          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-900 px-6 sm:px-10 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-lg"
          >
            Contact Us
          </a>
        </div>

      </div>
    </div>
  );
}
