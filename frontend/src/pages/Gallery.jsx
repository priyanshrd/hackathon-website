import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  // Sample gallery images (replace with your actual event images)
  const galleryImages = [
    { id: 1, src: './DSC_1085.jpg', category: 'team', alt: 'Team at the hackathon' },
    { id: 2, src: './IMG_4301.JPG', category: 'team', alt: 'Team at the hackathon' },
    { id: 3, src: './DSC_1139.jpg', category: 'team', alt: 'Organising Team and Judges' },
    { id: 4, src: './IMG_4200[1].jpg', category: 'team', alt: 'Team with mentors' },
    { id: 5, src: './DSC_1143.jpg', category: 'team', alt: 'Organising Team and Judges' },
    { id: 6, src: './DSC_2045.jpg', category: 'hackathon', alt: 'Particpants working' },
    { id: 7, src: './DSC_1935.jpg', category: 'hackathon', alt: 'Participants working' },
    { id: 8, src: './DSC_1862.jpg', category: 'hackathon', alt: 'Participants working' },
    { id: 9, src: './DSC_1156.jpg', category: 'team', alt: 'Organising team' },
    { id: 10, src: './DSC_1147.jpg', category: 'team', alt: 'Organising team' },
    { id: 11, src: './DSC_2110.jpg', category: 'hackathon', alt: 'Participants and POCs' },
    { id: 12, src: './DSC_0881.jpg', category: 'pitch', alt: 'Participant teams pitching' },
    { id: 13, src: './DSC_1077-1.jpg', category: 'pitch', alt: 'Participant teams pitching' },
    { id: 14, src: './DSC_1108.jpg', category: 'awards', alt: 'Podium Winners 3rd Place' },
    { id: 15, src: './DSC_1114.jpg', category: 'awards', alt: 'Podium Winners 2nd Place' },
    { id: 16, src: './DSC_1120.jpg', category: 'awards', alt: 'Podium Winners 1st Place' },
    { id: 17, src: './DSC_1839.jpg', category: 'hackathon', alt: 'Particpants working' },
    { id: 20, src: './DSC_1972.jpg', category: 'hackathon', alt: 'Particpants working' },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-500 mb-6 text-center animate-fade-in">
          Tech Tank 2025 Gallery
        </h1>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-all
                ${activeCategory === category 
                  ? 'bg-green-500 text-black font-bold' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
              `}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(image => (
            <motion.div 
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:brightness-75"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button 
                className="absolute -top-12 right-0 text-white hover:text-green-500 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="w-full max-h-[80vh] object-contain"
                />
                <div className="p-4 text-center">
                  <p className="text-green-500 font-bold text-lg">{selectedImage.alt}</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
        
        
      </div>
    </div>
  );
};

export default Gallery;