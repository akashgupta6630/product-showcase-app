import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SortOptions from '../components/SortOptions';

const PRODUCTS_PER_PAGE = 10;

function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [sort, setSort] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products and categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(err => console.error("Error fetching products:", err));

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  // Filtering + Sorting
  useEffect(() => {
    if (!products.length) return;

    let updated = [...products];

    // Category filter
    if (selectedCategory) {
      updated = updated.filter(p => p.category === selectedCategory);
    }

    // Price filter
    updated = updated.filter(p => typeof p.price === 'number' && p.price <= priceRange);

    // Sorting
    if (sort === 'price') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === 'name') {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'rating') {
      updated.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFiltered(updated);
    setCurrentPage(1); // Reset to page 1 on filter/sort change
  }, [products, selectedCategory, priceRange, sort]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);

  // Debug logs
  console.log("products:", products);
  console.log("filtered:", filtered);
  console.log("currentProducts:", currentProducts);

  return (
    <div className="p-4 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <FilterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
      />

      {/* Product area */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <SortOptions sort={sort} onSortChange={setSort} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
