
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  image: string;
}

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  
  const reviews: Review[] = [
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      text: "The quad biking experience was incredible! The trails were challenging and the staff was extremely helpful. Will definitely be back for more!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Sophia Martinez",
      rating: 5,
      text: "My kids absolutely loved the trampolines and VR games. The park has something for everyone and the staff ensures safety at all times. Highly recommended!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80"
    },
    {
      id: 3,
      name: "David Wilson",
      rating: 4,
      text: "The zipline was the highlight of our visit! The views are breathtaking and the rush of adrenaline is unmatched. The food options could be more diverse though.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80"
    },
    {
      id: 4,
      name: "Emily Chen",
      rating: 5,
      text: "We had our company outing at Thrills Fusion and it was the perfect choice! From activities to food, everything was well organized and everyone had a blast!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&fit=crop&q=80"
    },
    {
      id: 5,
      name: "Michael Brown",
      rating: 5,
      text: "The sand dunes adventure was unforgettable! Combining it with water activities made for a perfect day out. Highly recommend for thrill seekers!",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&fit=crop&q=80"
    },
    {
      id: 6,
      name: "Jessica Lee",
      rating: 4,
      text: "Great place for family fun! The kids couldn't get enough of the trampolines while adults enjoyed the more adventurous activities. Will definitely return!",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80"
    }
  ];
  
  // Get visible reviews based on active index
  const getVisibleReviews = () => {
    const visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (activeIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };
  
  // Auto-sliding functionality
  useEffect(() => {
    let interval: number | undefined;
    
    if (isAutoSliding) {
      interval = window.setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoSliding, reviews.length]);
  
  const handlePrev = () => {
    setIsAutoSliding(false);
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };
  
  const handleNext = () => {
    setIsAutoSliding(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  
  return (
    <section id="reviews" className="bg-primary/5">
      <div className="section-container py-10 md:py-16">
        <div className="text-center mb-16">
          <h2 className="section-title relative inline-block">
            Customer Reviews
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"></div>
          </h2>
          <p className="section-subtitle">
            See what our visitors have to say about their experiences at Thrills Fusion
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Large quote icon */}
          <div className="absolute top-0 left-0 text-primary/10 -z-10">
            <Quote className="w-32 h-32" />
          </div>
          
          {/* Reviews slider - now showing three cards at once */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-10">
            {getVisibleReviews().map((review) => (
              <div key={review.id} className="animate-fade-in">
                <div className="glass-card rounded-2xl p-6 md:p-8 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-secondary/30">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-base md:text-lg italic mb-4 line-clamp-4">{review.text}</p>
                  <h4 className="text-lg font-semibold">{review.name}</h4>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex items-center justify-center mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoSliding(false);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                  activeIndex <= index && index < activeIndex + 3 ? 'bg-primary w-8' : 'bg-primary/30'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
