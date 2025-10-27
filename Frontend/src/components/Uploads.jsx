import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 1200, once: true });

// --- MOCK DATA for demonstration ---
const mockSermons = [
    { id: 1, title: "The Power of Forgiveness", date: "Oct 15, 2025", speaker: "Elder Smith", duration: "45 min", imageUrl: "images/image.jpg" },
    { id: 2, title: "Walking in Faith", date: "Oct 8, 2025", speaker: "Pastor John", duration: "50 min", imageUrl: "images/image.jpg" },
    { id: 3, title: "Mission in the City", date: "Oct 1, 2025", speaker: "Deaconess Mary", duration: "40 min", imageUrl: "images/image.jpg" },
    { id: 4, title: "Joy in Suffering", date: "Sep 24, 2025", speaker: "Elder Smith", duration: "48 min", imageUrl: "images/image.jpg" },
    { id: 5, title: "Building a Better Home", date: "Sep 17, 2025", speaker: "Pastor John", duration: "55 min", imageUrl: "images/image.jpg" },
    { id: 6, title: "The Enduring Hope", date: "Sep 10, 2025", speaker: "Deaconess Mary", duration: "42 min", imageUrl: "images/image.jpg" },
];

const Uploads = () => {
  return (
    // Outer container adjusted to fit better within the Home component's section (removed min-h-screen)
    <div className="py-12 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title - Styled with Yellow Accent */}
        <div className="mb-12 text-center" data-aos="fade-down">
          <h2 className="text-base font-bold uppercase tracking-widest text-yellow-600 mb-1">
            Media Library
          </h2>
          <h3 className="text-4xl font-extrabold text-gray-900">
            Latest Sermons & Worship Services
          </h3>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Media Cards Grid - Using yellow/black theme */}
        <div className="flex flex-wrap justify-center gap-8 p-2">
          
          {mockSermons.map((sermon, index) => (
            <div
              key={sermon.id}
              // Card Styling: bg-gray-900 with yellow accents on hover
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-0 bg-gray-900 rounded-xl shadow-xl overflow-hidden 
                         transform transition-all duration-300 ease-in-out 
                         hover:shadow-yellow-500/50 hover:-translate-y-1 hover:border-2 hover:border-yellow-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image Container with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sermon.imageUrl}
                  alt={sermon.title}
                  // 👇 FIX 1: Changed 'class' to 'className'
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 opacity-80"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg transform hover:scale-110">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-4 text-white">
                <p className="text-sm font-semibold text-yellow-400 mb-1 uppercase tracking-wider">
                    {sermon.date} | {sermon.duration}
                </p>
                <h3 className="text-xl font-bold mb-2 truncate" title={sermon.title}>
                  {sermon.title}
                </h3>
                <p className="text-gray-400 text-sm">
                    Speaker: <span className="font-medium text-gray-300">{sermon.speaker}</span>
                </p>
                
                <button 
                    className="mt-4 w-full text-center py-2 text-sm font-semibold 
                               border border-yellow-500 text-yellow-400 rounded-md 
                               hover:bg-yellow-500 hover:text-gray-900 transition duration-200"
                >
                    Watch Now
                </button>
              </div>
            </div>
          ))}
          
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
            <button 
                className="bg-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg 
                           hover:bg-yellow-700 transition duration-300"
            >
                View All Sermons
            </button>
        </div>
      </div>
    </div>
  );
};

export default Uploads;