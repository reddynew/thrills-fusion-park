
import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, Plus, Minus, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import QRCode from 'react-qr-code';

import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'date-fns';


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

declare global {
  interface Window {
    Razorpay: any;
  }
}


const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'razorpay'>('upi');
  const [success,setSuccess]=useState(true);

  const [tickets, setTickets] = useState<TicketType[]>([
    { name: "Adults", price: 499, count: 0 },
    { name: "Children (5-12 yrs)", price: 299, count: 0 },
    { name: "Seniors (65+ yrs)", price: 399, count: 0 },
  ]);

  const totalAmount = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.count), 0);
  const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.count, 0);
  const navigate=useNavigate();


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

    if (paymentMethod === 'razorpay') {
      handlePayment();
      return;
    }
    else

    setShowQr(true);
  };

  // Function to send SMS
  const sendSms = async (details: BookingDetails) => {
    setIsSendingSms(true);
    try {
      // In a real application, this would be an API call to your SMS service
      console.log("Sending SMS to:", details.mobile, "with booking details");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "SMS Sent",
        description: "Booking details have been sent to your mobile number.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to send SMS:", error);
      toast({
        title: "SMS Failed",
        description: "Could not send booking details to your mobile. Please save your booking ID.",
        variant: "destructive",
      });
    } finally {
      setIsSendingSms(false);
    }
  };

  // Function to send Email
  const sendEmail = async (details: BookingDetails) => {
    if (!details.email) return;
    
    setIsSendingEmail(true);
    try {
      // In a real application, this would be an API call to your email service
      console.log("Sending email to:", details.email, "with booking details");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Email Sent",
        description: "Booking details have been sent to your email.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Email Failed",
        description: "Could not send booking details to your email. Please save your booking ID.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handlePaymentSuccess = async () => {
    const bookingDetails: BookingDetails = {
      name,
      mobile,
      email,
      visitDate,
      tickets: tickets.filter(t => t.count > 0),
      totalAmount,
    };
    
    console.log("Booking completed:", bookingDetails);
    
    // Generate a random booking ID
    const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Send notifications
    await sendSms(bookingDetails);
    if (email) {
      await sendEmail(bookingDetails);
    }
    
    toast({
      title: "Booking Successful!",
      description: `Your booking ID is ${bookingId}. Details sent to your mobile${email ? " and email" : ""}.`,
      variant: "default",
    });
    
    setBookingComplete(true);
    
    setTimeout(() => {
      onClose();
    }, 3000);
  };

const upiId='7793996111@ybl'
  // Generate UPI payment string
  // const upiPaymentString = `upi://pay?pa=${upiId}&am=${totalAmount}&cu=INR`;

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
          We've sent the details to your phone{email ? " and email" : ""}
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

          UPI ID: 7793996111@ybl

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
            disabled={isSendingSms || isSendingEmail}

            className="px-4 py-2 rounded-lg bg-br1 text-white hover:bg-[#33C3F0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

          >
            {(isSendingSms || isSendingEmail) ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    );
  }
 
    
  
  const amount=totalAmount
   const handlePayment = async () => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK not loaded. Please refresh and try again.");
      return;}
    try {
        // Step 1: Create Order in Backend
        const { data } = await axios.post("http://localhost:3000/api/orders", {
            amount
        });

        // Step 2: Open Razorpay Checkout
        const options = {
            key: "rzp_test_OXI064J7Refsr1",  // Use Test Key
            amount: data.amount,
            currency: data.currency,
            name: "ThrillsFusion",
            description: "Test Transaction",
            order_id: data.id,
            handler: async function (response) {
                console.log("Payment Successful!", response);
                // setSuccess(false);
                   
                // Step 3: Send Payment Details to Backend for Verification
                const verifyRes = await axios.post("http://localhost:3000/api/success", {
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                });

                if (verifyRes.data.message === "Payment verified successfully!") {
                  alert("Payment Verified!");
                  handlePaymentSuccess();
                    
                } else {
                    alert("Payment Verification Failed!");
                }
            },
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
            modal: {
              backdropclose: false // ✅ Prevent closing on outside click
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.error("Payment Error:", error);
    }
};

const handlenav=()=>{
  onClose()
}


  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-br1 mb-0">Book Your Visit</h3>
      {/* Two sections in a grid for better space usage */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left section: Contact details */}
        <div className="space-y-3">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-br1" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-8 w-full h-9 rounded-md border border-br1/20 bg-white px-3 py-1 text-sm focus:border-br1 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="mobile" className="text-sm font-medium">
              Mobile <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-br1" />
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="pl-8 w-full h-9 rounded-md border border-br1/20 bg-white px-3 py-1 text-sm focus:border-br1 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email (Optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-br1" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-8 w-full h-9 rounded-md border border-br1/20 bg-white px-3 py-1 text-sm focus:border-br1 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="visitDate" className="text-sm font-medium">
              Visit Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-br1" />
              <input
                id="visitDate"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="pl-8 w-full h-9 rounded-md border border-br1/20 bg-white px-3 py-1 text-sm focus:border-br1 focus:outline-none"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>
        </div>

        {/* Right section: Ticket selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Select Tickets</h4>
          {tickets.map((ticket, index) => (
            <div
              key={ticket.name}
              className="flex items-center justify-between py-1 border-b border-[#f3f3f3]"
            >
              <div>
                <p className="text-sm font-medium">{ticket.name}</p>
                <p className="text-xs text-br1 font-bold">
                  ₹{ticket.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateTicketCount(index, false)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-[#f3f3f3] hover:bg-[#e3e3e3] text-br1"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-4 text-center text-sm font-bold">
                  {ticket.count}
                </span>
                <button
                  type="button"
                  onClick={() => updateTicketCount(index, true)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-br1 hover:bg-[#33C3F0] text-white"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-[#f3f3f3]">
            <div className="flex justify-between text-xs mb-1">
              <span>Total Tickets:</span>
              <span className="font-bold">{totalTickets}</span>
            </div>

            <div className="flex justify-between font-bold text-base text-br1">
              <div className="flex justify-between font-bold text-base text-[#1EAEDB]">
                <span>Total Amount:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h4 className="font-medium mb-3">Select Payment Method</h4>
          <div className="flex space-x-4 mb-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`px-4 py-2 rounded-lg border ${
                paymentMethod === "upi"
                  ? "bg-br1/90 text-white border-white"
                  : "bg-secondary/60 text-white border-input"
              }`}
            >
              UPI Payments
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("razorpay")}
              className={`px-4 py-2 rounded-lg border ${
                paymentMethod === "razorpay"
                  ? "bg-br1/90 text-white border-white"
                  : "bg-secondary/60 text-white border-input"
              }`}
            >
              Card/Netbanking
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4 ">
          {/* <button
            type="button"
            onClick={handlenav}
            
            className="px-6 py-3 rounded-lg bg-black/80 hover:bg-black text-white text-lg" // Adjusted padding and text size
          >
            Cancel
          </button> */}
          {/* <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-black/80 hover:bg-black text-white text-lg" // Adjusted padding and text size
          >
            Proceed
          </button> */}
        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={totalTickets === 0}
        className="w-full mt-2 px-4 py-2 rounded-lg bg-[#1EAEDB] text-white hover:bg-[#33C3F0] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Proceed to Payment
      </button>
      <button
            type="button"
            onClick={handlenav}
        className="w-full mt-2 px-4 py-2 rounded-lg bg-[#1EAEDB] text-white hover:bg-[#33C3F0] font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
    </div>
  );
};


export default BookingForm;
