import { Navbar } from '@/components/common/Navbar';
import Image from 'next/image';

export default function EgyexplorePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)]">
        {/* Black screen, no content */}
      </div>
    </div>
  );
}

function DestinationCard({ 
  title, 
  description, 
  imagePlaceholder,
  bgColor
}: { 
  title: string; 
  description: string;
  imagePlaceholder: string;
  bgColor: string;
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className={`relative h-48 w-full ${bgColor} flex items-center justify-center`}>
        <span className="text-lg font-semibold">{imagePlaceholder}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Explore more →
        </button>
      </div>
    </div>
  );
} 