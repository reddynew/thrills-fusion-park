
import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, Plus, Minus, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import QRCode from 'react-qr-code';

interface BookingFormProps {
  onClose: () => void;
}

interface TicketType {
  name: string;
  price: number;
  count: number;
}

interface BookingDetails {
  name: string;
  mobile: string;
  email: string;
  visitDate: string;
  tickets: TicketType[];
  totalAmount: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  const [tickets, setTickets] = useState<TicketType[]>([
    { name: "Adults", price: 499, count: 0 },
    { name: "Children (5-12 yrs)", price: 299, count: 0 },
    { name: "Seniors (65+ yrs)", price: 399, count: 0 },
  ]);

  const totalAmount = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.count), 0);
  const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.count, 0);

  const updateTicketCount = (index: number, increment: boolean) => {
    const newTickets = [...tickets];
    if (increment) {
      newTickets[index].count += 1;
    } else if (newTickets[index].count > 0) {
      newTickets[index].count -= 1;
    }
    setTickets(newTickets);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !mobile || !visitDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (totalTickets === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket.",
        variant: "destructive",
      });
      return;
    }
    
    // Show QR code for payment
    setShowQr(true);
  };

  const handlePaymentSuccess = () => {
    // Log booking details (in a real app, this would save to a database)
    const bookingDetails: BookingDetails = {
      name,
      mobile,
      email,
      visitDate,
      tickets: tickets.filter(t => t.count > 0),
      totalAmount,
    };
    
    console.log("Booking completed:", bookingDetails);
    
    // Show success message
    toast({
      title: "Booking Successful!",
      description: "Your tickets have been booked successfully.",
      variant: "default",
    });
    
    setBookingComplete(true);
    
    // Close dialog after showing success for a while
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  // Generate UPI payment string
  const upiPaymentString = `upi://pay?pa=7793996111@upi&pn=ThrillsFusion&am=${totalAmount.toFixed(2)}&cu=INR&tn=Ticket booking for ${totalTickets} persons`;

  if (bookingComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Booking Complete!</h3>
        <p className="text-muted-foreground text-center">
          Your booking for {totalTickets} tickets has been confirmed.<br />
          We've sent the details to your phone.
        </p>
      </div>
    );
  }

  if (showQr) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <h3 className="text-lg font-medium mb-4">Scan to Pay ₹{totalAmount.toFixed(2)}</h3>
        <div className="bg-white p-4 rounded-lg mb-6">
          <QRCode value={upiPaymentString} size={200} />
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          UPI ID: 7793996111
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowQr(false)}
            className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            Back
          </button>
          <button 
            onClick={handlePaymentSuccess}
            className="px-4 py-2 rounded-lg bg-[#1EAEDB] text-white hover:bg-[#33C3F0]"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Visitor Information */}
      <div className="bg-[#f3f3f3] p-5 rounded-lg">
        <h3 className="text-lg font-bold text-[#1EAEDB] mb-4">Visitor Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1EAEDB]" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full h-10 rounded-md border border-[#1EAEDB]/20 bg-white px-3 py-2 text-sm focus:border-[#1EAEDB] focus:outline-none focus:ring-1 focus:ring-[#1EAEDB]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="mobile" className="text-sm font-medium">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1EAEDB]" />
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="pl-10 w-full h-10 rounded-md border border-[#1EAEDB]/20 bg-white px-3 py-2 text-sm focus:border-[#1EAEDB] focus:outline-none focus:ring-1 focus:ring-[#1EAEDB]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email (Optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1EAEDB]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full h-10 rounded-md border border-[#1EAEDB]/20 bg-white px-3 py-2 text-sm focus:border-[#1EAEDB] focus:outline-none focus:ring-1 focus:ring-[#1EAEDB]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="visitDate" className="text-sm font-medium">
              Visit Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1EAEDB]" />
              <input
                id="visitDate"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="pl-10 w-full h-10 rounded-md border border-[#1EAEDB]/20 bg-white px-3 py-2 text-sm focus:border-[#1EAEDB] focus:outline-none focus:ring-1 focus:ring-[#1EAEDB]"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
        </form>
      </div>
      
      {/* Vertical Separator */}
      <div className="hidden md:block w-px bg-border h-auto mx-auto" />
      
      {/* Ticket Selection */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-[#1EAEDB] mb-4">Select Tickets</h3>
        <div className="space-y-4">
          {tickets.map((ticket, index) => (
            <div key={ticket.name} className="flex items-center justify-between p-3 border-b border-[#f3f3f3]">
              <div>
                <p className="font-medium">{ticket.name}</p>
                <p className="text-sm text-[#1EAEDB] font-bold">₹{ticket.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateTicketCount(index, false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f3f3f3] hover:bg-[#e3e3e3] text-[#1EAEDB]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-bold">{ticket.count}</span>
                <button
                  type="button"
                  onClick={() => updateTicketCount(index, true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-[#f3f3f3]">
          <div className="flex justify-between text-sm mb-2">
            <span>Total Tickets:</span>
            <span className="font-bold">{totalTickets}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-[#1EAEDB]">
            <span>Total Amount:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={totalTickets === 0}
          className="w-full mt-6 px-6 py-3 rounded-lg bg-[#1EAEDB] text-white hover:bg-[#33C3F0] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
