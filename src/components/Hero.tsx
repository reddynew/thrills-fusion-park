import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import BookingForm from './BookingForm';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay - now using a collage of sand dunes and water games */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://media.istockphoto.com/id/92051506/photo/quad-bike-mud-fun-with-a-smiling-young-girl.jpg?s=612x612&w=0&k=20&c=Uvsn_EGKJA8YK71NM6v-UU35uLpltd8-5Br0HKygjjo=")',
            filter: 'brightness(0.7)',
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Water elements overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-overlay"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=2000&fit=crop&q=8")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 bg-primary/20" />
      </div>
      
      {/* Animated Elements */}
      {/* <div ref={parallaxRef} className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 backdrop-blur-3xl animate-float animation-delay-300" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/10 backdrop-blur-3xl animate-float animation-delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-primary/10 backdrop-blur-3xl animate-float animation-delay-500" />
      </div> */}
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          <span className="block">Welcome to</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-white animate-pulse-soft">THRILLS FUSION</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
          Experience the ultimate adventure with our thrilling rides and attractions designed for everyone
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#thrilling-zones"
            className="glass-card px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
          >
            Explore Activities
          </a>
          <a 
            href="#location"
            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
          >
            Find Location
          </a>
          <button 
            onClick={() => setShowBookingDialog(true)}
            className="glass-card px-8 py-4 rounded-full  text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-br1/20 hover:scale-105 adventure-blink1"
          >
            Book Now
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-10 h-10 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Booking Dialog - updated to be more compact */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[600px] p-4">
          <BookingForm onClose={() => setShowBookingDialog(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
