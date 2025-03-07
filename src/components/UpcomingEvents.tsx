
import React from 'react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

interface EventProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  delay: string;
}

const EventCard: React.FC<EventProps> = ({ title, date, time, location, description, imageSrc, delay }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg card-hover ${delay}`}>
      <div className="relative h-48 image-hover">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Upcoming
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <a 
          href="#" 
          className="inline-flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Ticket className="w-4 h-4" />
          Get Tickets
        </a>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const events = [
    {
      title: "Quad Bike Championship",
      date: "June 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "Main Arena",
      description: "Join us for the annual quad bike racing championship with participants from all over the country.",
      imageSrc: "https://images.unsplash.com/photo-1653439644664-a563cebaf4c9?q=80&w=2960&auto=format&fit=crop",
      delay: "animation-delay-100"
    },
    {
      title: "VR Gaming Tournament",
      date: "June 22, 2023",
      time: "1:00 PM - 8:00 PM",
      location: "VR Zone",
      description: "Compete in our virtual reality gaming tournament with amazing prizes for the winners.",
      imageSrc: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=2787&auto=format&fit=crop",
      delay: "animation-delay-200"
    },
    {
      title: "Family Fun Day",
      date: "July 5, 2023",
      time: "9:00 AM - 6:00 PM",
      location: "Entire Park",
      description: "A special day for families with discounted tickets, special performances and exclusive activities.",
      imageSrc: "https://images.unsplash.com/photo-1517457210348-702795bf2522?q=80&w=2787&auto=format&fit=crop",
      delay: "animation-delay-300"
    }
  ];

  return (
    <section id="upcoming-events" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background -z-10" />
      
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title relative inline-block">
            Upcoming Events
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full"></div>
          </h2>
          <p className="section-subtitle">
            Don't miss our special events and limited-time experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              description={event.description}
              imageSrc={event.imageSrc}
              delay={event.delay}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <a 
            href="#" 
            className="glass-card px-8 py-4 rounded-full bg-gradient-to-r from-accent to-primary text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-105"
          >
            View All Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
