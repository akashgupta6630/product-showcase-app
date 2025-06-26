import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
        <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain" />
        <h2 className="mt-2 font-semibold text-sm">{product.title}</h2>
        <p className="text-green-600 font-bold">${product.price}</p>
        <p className="text-yellow-500 text-sm">Rating: {product.rating.rate}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
