import { Navbar } from '@/components/common/Navbar';

export default function EgytreasurePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)]">
        {/* Black screen, no content */}
      </div>
    </div>
  );
}

function CollectionCard({ 
  title, 
  description,
  itemCount,
  bgColor
}: { 
  title: string; 
  description: string;
  itemCount: number;
  bgColor: string;
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className={`relative h-40 w-full ${bgColor} flex items-center justify-center`}>
        <span className="text-lg font-semibold">{title}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">{itemCount} items</span>
          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            View Collection →
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ 
  name, 
  price,
  category,
  rating,
  reviews
}: { 
  name: string; 
  price: number;
  category: string;
  rating: number;
  reviews: number;
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-800/80 transition-colors">
      <div className="bg-gray-700/30 h-48 rounded-md flex items-center justify-center mb-4">
        <span className="text-base font-medium">Product Image</span>
      </div>
      <div className="mb-2">
        <span className="text-xs text-gray-400">{category}</span>
        <h3 className="font-semibold text-lg leading-tight mb-1">{name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-1">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span className="text-gray-600">★</span>
          </div>
          <span className="text-xs text-gray-400">{rating} ({reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
          <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 