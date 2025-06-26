function FilterSidebar({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange }) {
  return (
    <div className="border rounded p-4 w-full md:w-64">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={selectedCategory}
          onChange={e => onCategoryChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block mb-1 font-medium">Max Price: ${priceRange}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={e => onPriceChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default FilterSidebar;
