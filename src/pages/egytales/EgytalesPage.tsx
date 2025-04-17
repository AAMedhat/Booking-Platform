import { Navbar } from '@/components/common/Navbar';

export default function EgytalesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)]">
        {/* Black screen, no content */}
      </div>
    </div>
  );
}

function BlogPost({ 
  title, 
  author,
  date,
  excerpt,
  category,
  readTime
}: { 
  title: string; 
  author: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}) {
  return (
    <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <span className="bg-blue-900/30 text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded">
          {category}
        </span>
        <span className="text-gray-400 text-sm">{readTime}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-400">
          <span className="font-medium text-gray-300">{author}</span> • {date}
        </div>
        <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Read more →
        </button>
      </div>
    </div>
  );
} 