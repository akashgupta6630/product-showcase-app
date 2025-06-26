function SortOptions({ sort, onSortChange }) {
  return (
    <div>
      <label className="mr-2 font-medium">Sort By:</label>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
}

export default SortOptions;
