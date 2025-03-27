
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import { useToast } from '@/hooks/use-toast';

interface EventProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageSrc: string;
  delay: string;
}

interface TicketOption {
  type: string;
  price: number;
  quantity: number;
}

const EventCard: React.FC<EventProps> = ({ title, date, time, location, description, imageSrc, delay }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [ticketOptions, setTicketOptions] = useState<TicketOption[]>([
    { type: "spots", price: 499, quantity: 0 }
  ]);
 
  const updateTicketQuantity = (index: number, newQuantity: number) => {
    const newOptions = [...ticketOptions];
    newOptions[index].quantity = Math.max(0, newQuantity);
    setTicketOptions(newOptions);
  };

  const totalPrice = ticketOptions.reduce((sum, option) => sum + (option.price * option.quantity), 0);
  const totalTickets = ticketOptions.reduce((sum, option) => sum + option.quantity, 0);
  const upiId = '7793996111@ybl';
  const upiPaymentString = `upi://pay?pa=${upiId}&am=${totalPrice}&cu=INR`;
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay'>('upi');
  const {toast}=useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'razorpay') {
      // Handle Razorpay Payment
      toast({
        title: "Razorpay Payment",
        description: "Razorpay payment gateway is not implemented in this demo.",
        variant: "destructive",
      });
      return
    } else {
      setShowQr(true);
    }
  };
  
  const handlePaymentSuccess = () => {
    toast({
      title: "Payment successful!",
      description: "Tickets booked successfully.",
      variant: "default",
    });
    setShowQr(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className={`bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg card-hover ${delay}`}>
        <div className="relative h-48 image-hover">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3  adventure-blink text-white px-3 py-1 rounded-full text-sm font-semibold">
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
          
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-br/70 hover:bg-primary/30 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Ticket className="w-4 h-4" />
            Register
          </button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{title} - Book Tickets</DialogTitle>
            <DialogDescription>
              {date} at {time} | {location}
            </DialogDescription>
          </DialogHeader>
          
          {!showQr ? (
            <div className="py-4">
              <h3 className="text-lg font-medium mb-3">Select Tickets</h3>
              
              <div className="space-y-4">
                {ticketOptions.map((option, index) => (
                  <div key={option.type} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ticket</p>
                      <p className="text-sm text-muted-foreground">Entry: {option.price.toFixed(2)} INR per spot</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateTicketQuantity(index, option.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/60 hover:bg-secondary text-black"
                        type="button"
                      >
                        -
                      </button>
                      
                      <span className="w-6 text-center">{option.quantity}</span>
                      
                      <button 
                        onClick={() => updateTicketQuantity(index, option.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/60 hover:bg-secondary text-black"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="my-6 pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Total Tickets:</span>
                  <span>{totalTickets}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Price:</span>
                  <span>INR {totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-3">Select Payment Method</h4>
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`px-4 py-2 rounded-lg border ${
                      paymentMethod === 'upi' 
                        ? 'bg-primary/90 text-white border-primary' 
                        : 'bg-secondary/60 text-white border-input'
                    }`}
                  >
                    UPI Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`px-4 py-2 rounded-lg border ${
                      paymentMethod === 'razorpay' 
                        ? 'bg-primary/90 text-white border-primary' 
                        : 'bg-secondary/60 text-white border-input'
                    }`}
                  >
                    Card/Netbanking
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-7">
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 rounded-lg bg-black/80 hover:bg-black text-white"
                  type="button"
                >
                  Cancel
                </button>
                
                <button 
                  onClick={handleSubmit}
                  disabled={totalTickets === 0}
                  className="px-4 py-2 rounded-lg bg-black/80 hover:bg-black text-white disabled:cursor-not-allowed"
                  type="button"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <h3 className="text-lg font-medium mb-4">Scan to Pay ₹{totalPrice.toFixed(2)}</h3>
              <div className="bg-white p-4 rounded-lg mb-6">
                <QRCode value={upiPaymentString} size={200} />
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                UPI ID: {upiId}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowQr(false)}
                  className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  type="button"
                >
                  Back
                </button>
                <button 
                  onClick={handlePaymentSuccess}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  type="button"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
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
    <section id="upcoming-events" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background -z-10" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 relative inline-block">
            Upcoming Events
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></div>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary/80 to-primary text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
          >
            View All Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
