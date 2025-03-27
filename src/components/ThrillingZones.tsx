
import React from 'react';
import { Bike, Gamepad, Mountain, Tent, Coffee, Zap } from 'lucide-react';

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgImage: string;
  delay: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ icon, title, description, bgImage, delay }) => {
  return (
    <div className={`relative group rounded-2xl overflow-hidden h-[350px] card-hover animate-fade-in ${delay}`}>
      <div className="absolute inset-0 image-hover">
        <img 
          src={bgImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
        <div className="bg-white/10 backdrop-blur-md w-16 h-16 flex items-center justify-center rounded-full mb-4 text-white border border-white/20 group-hover:bg-primary transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 transform max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-24">
          {description}
        </p>
      </div>
    </div>
  );
};

const ThrillingZones = () => {
  const activities = [
    {
      icon: <Bike className="w-8 h-8" />,
      title: "Quad & Mud Bikes",
      description: "Experience the thrill of riding through challenging terrains with our high-performance quad and mud bikes.",
      bgImage: "https://images.unsplash.com/photo-1597383586503-4871a3259720?q=80&w=2874&auto=format&fit=crop",
      delay: "animation-delay-100"
    },
    {
      icon: <Gamepad className="w-8 h-8" />,
      title: "VR Games",
      description: "Immerse yourself in cutting-edge virtual reality experiences with our state-of-the-art VR gaming zone.",
      bgImage: "https://images.unsplash.com/photo-1626379953819-c9cd4bcaa779?q=80&w=2960&auto=format&fit=crop",
      delay: "animation-delay-200"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Trampolines",
      description: "Jump, flip and bounce on our professional trampolines designed for maximum fun and safety.",
      bgImage: "https://images.unsplash.com/photo-1559339352-b599e5c13a22?q=80&w=2874&auto=format&fit=crop",
      delay: "animation-delay-300"
    },
    {
      icon: <Tent className="w-8 h-8" />,
      title: "Sky Activities",
      description: "Reach for the sky with our exhilarating aerial activities that will give you an adrenaline rush like never before.",
      bgImage: "https://images.unsplash.com/photo-1619115624573-de8d40365ebf?q=80&w=2874&auto=format&fit=crop",
      delay: "animation-delay-400"
    },
    {
      icon: <Mountain className="w-8 h-8" />,
      title: "Climbing & Zipline",
      description: "Challenge yourself on our climbing walls and zoom through the air on our thrilling ziplines.",
      bgImage: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=3103&auto=format&fit=crop",
      delay: "animation-delay-500"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Food & Beverages",
      description: "Refuel with delicious food and refreshing beverages at our various dining outlets throughout the park.",
      bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop",
      delay: "animation-delay-500"
    }
  ];

  return (
    <section id="thrilling-zones" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10" />
      
      <div className="section-container">
        <div className="text-center mb-5">
          <h2 className="section-title relative inline-block">
            Thrilling Zones
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"></div>
          </h2>
          <p className="section-subtitle">
            Discover our wide range of exciting activities designed to give you an unforgettable experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              bgImage={activity.bgImage}
              delay={activity.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThrillingZones;
