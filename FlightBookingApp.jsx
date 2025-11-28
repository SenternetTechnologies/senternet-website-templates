import React, { useState, useMemo, useEffect } from 'react';

// --- Global Constants and Initial State ---

const mockFlights = [
  { id: 101, departure: 'DEL (India)', arrival: 'DXB (UAE)', duration: '4h 10m', price: 18500, airline: 'Air Senternet', time: '11:00', visaRequired: false },
  { id: 102, departure: 'BOM (India)', arrival: 'JFK (USA)', duration: '17h 55m', price: 55000, airline: 'Global Wings', time: '01:30', visaRequired: true },
  { id: 103, departure: 'BLR (India)', arrival: 'SIN (Singapore)', duration: '5h 30m', price: 21200, airline: 'AsiaFly', time: '14:45', visaRequired: false },
];

const steps = [
  { id: 1, title: 'Search & Select' },
  { id: 2, title: 'AI Assistant' },
  { id: 3, title: 'Passenger Details' },
  { id: 4, title: 'Documents' },
  { id: 5, title: 'Seat Map' },
  { id: 6, title: 'Review & Pay' },
  { id: 7, title: 'Confirmation' },
];

const initialBookingState = {
  flight: null,
  traveler: {
    firstName: '',
    lastName: '',
    dob: '',
    passportNumber: '',
    passportSubmitted: false,
    email: '',
  },
  seat: null,
  paymentCompleted: false,
};

// --- Custom Components ---

/** 1. Search & Selection Step */
const FlightSearchStep = ({ bookingData, setBookingData, nextStep }) => {
  const handleSelectFlight = (flight) => {
    setBookingData(prev => ({ 
      ...prev, 
      flight 
    }));
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800">1. Search & Select Flight (India Outbound)</h2>
      <p className="text-gray-600">Simulating real-time flight availability from major Indian hubs.</p>
      
      {/* Search Bar Mock */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-xl shadow-inner border border-gray-200">
        <input type="text" defaultValue="India (DEL, BOM, BLR)" readOnly className="p-3 border rounded-lg bg-white font-medium cursor-not-allowed" />
        <input type="text" placeholder="Destination (e.g., JFK, DXB)" className="p-3 border rounded-lg focus:ring-blue-500" />
        <input type="date" defaultValue="2026-04-10" className="p-3 border rounded-lg focus:ring-blue-500" />
        <button className="py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition">Search</button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">Available Flights</h3>
        {mockFlights.map(flight => (
          <div key={flight.id} className="flex flex-col md:flex-row items-center justify-between p-5 mb-4 border border-gray-300 bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-[1.01] duration-300">
            <div>
              <p className="font-bold text-xl text-gray-800 flex items-center">
                <span className="text-blue-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l.49-1.3A5 5 0 0110 12.583v-4.66a1 1 0 112 0v4.66a5 5 0 014.53 3.027l.49 1.3a1 1 0 001.17-1.409l-7-14z"/></svg>
                </span>
                {flight.airline}
              </p>
              <p className="text-sm text-gray-500 mt-1">{flight.departure} to {flight.arrival} | {flight.time} Departure</p>
            </div>
            <div className="text-center my-3 md:my-0">
              <p className="text-sm font-semibold text-gray-700">{flight.duration}</p>
              <p className="text-xs text-red-500">{flight.visaRequired ? 'Visa Check Required' : 'Visa Recommended'}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-green-600">₹{flight.price.toLocaleString('en-IN')}</p>
              <button 
                onClick={() => handleSelectFlight(flight)}
                className="mt-2 px-6 py-2 bg-green-500 text-white text-md font-semibold rounded-full hover:bg-green-600 shadow-md transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** 2. AI Travel Assistant Step */
const AIAssistantStep = ({ aiQuery, setAiQuery, aiResponse, setAiResponse, isAiLoading, setIsAiLoading }) => {
  const mockAiCall = () => {
    setIsAiLoading(true);
    
    // --- REAL GEMINI API CALL STRUCTURE MOCK START ---
    // The actual fetch request would go here, utilizing the React state for the query.
    // We simulate the response for demonstration.
    
    console.log("Simulating AI API call for query:", aiQuery);

    setTimeout(() => {
        let responseText = `AI Response for "${aiQuery}":\n\n`;
        if (aiQuery.toLowerCase().includes('visa') || aiQuery.toLowerCase().includes('entry')) {
            responseText += "For Indian passport holders flying to most non-SAARC countries, a visa (E-Visa or Stamped) is mandatory. Please confirm with the destination embassy for the latest travel restrictions and health protocols.";
        } else if (aiQuery.toLowerCase().includes('baggage')) {
            responseText += "Checked baggage allowance is typically 20-30kg for economy class. Carry-on luggage is restricted to one bag plus a small personal item. Always check your selected airline's exact policy.";
        } else {
            responseText += "That’s an excellent question! Remember to keep your mobile phone charged, have local currency ready for minor expenses, and inform your bank about your international travel dates. Have a safe trip!";
        }
        setAiResponse(responseText);
        setIsAiLoading(false);
    }, 1500);
    // --- REAL GEMINI API CALL STRUCTURE MOCK END ---
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800">2. AI Travel Assistant (Powered by Senternet AI)</h2>
      <div className="bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-200 space-y-4">
        <div className="flex items-center space-x-3 text-blue-800 font-semibold text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0v-7.268a2 2 0 000-3.464V4zM17 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0v-7.268a2 2 0 000-3.464V4z"/></svg>
          <span>Ask Your Query Here</span>
        </div>
        
        {/* AI Response Box */}
        <div className="min-h-[150px] p-4 bg-white border border-blue-300 rounded-lg shadow-md">
          <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
          {isAiLoading && (
              <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-sm text-blue-500 mt-2">Connecting to Senternet AI Knowledge Base...</p>
              </div>
          )}
        </div>
        
        {/* User Input */}
        <textarea 
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          rows="3" 
          placeholder="e.g., What documents are required for entry into the USA with an Indian passport?" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
        ></textarea>
        <button 
          onClick={mockAiCall}
          disabled={isAiLoading || aiQuery.length < 5}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          Get AI Advice
        </button>
      </div>
    </div>
  );
};

/** 3. Passenger Details Step */
const PassengerDetailsStep = ({ bookingData, setBookingData }) => {
  const traveler = bookingData.traveler;

  const handleChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      traveler: { ...prev.traveler, [field]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800">3. Passenger Details & Verification</h2>
      <p className="text-gray-600">Ensure all details match your valid Indian Passport exactly.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border">
        {['firstName', 'lastName', 'email', 'passportNumber', 'dob'].map(field => (
          <label key={field} className="block">
            <span className="text-gray-700 capitalize font-medium">
              {field === 'dob' ? 'Date of Birth' : 
               field === 'passportNumber' ? 'Passport Number' : 
               field.replace(/([A-Z])/g, ' $1').trim()}
              {field === 'email' ? ' (for E-Ticket)' : ''}
            </span>
            <input
              type={field === 'dob' ? 'date' : field === 'email' ? 'email' : 'text'}
              value={traveler[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${field === 'dob' ? 'Date of Birth' : field.replace(/([A-Z])/g, ' $1').trim()}`}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              {...(field === 'passportNumber' && { maxLength: 10 })}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

/** 4. Passport & Visa Submission Step */
const DocumentSubmissionStep = ({ bookingData, setBookingData }) => {
  const visaRequired = bookingData.flight?.visaRequired;
  
  const handleSubmission = (e) => {
    setBookingData(prev => ({
      ...prev,
      traveler: { ...prev.traveler, passportSubmitted: e.target.checked }
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800">4. Passport & Visa Submission</h2>
      <div className={`p-5 rounded-xl border-l-4 ${visaRequired ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}>
        <p className="font-bold text-lg">
          Destination Status: <span className={`${visaRequired ? 'text-red-700' : 'text-green-700'}`}>{visaRequired ? 'VISA REQUIRED (USA/UK/etc.)' : 'VISA NOT REQUIRED (UAE/Singapore/etc.)'}</span>
        </p>
        <p className="text-sm mt-2">
          {visaRequired 
            ? 'Action Required: You must submit proof of your valid visa or residency permit for entry.'
            : 'Action: Only the primary passport data page submission is required for verification.'
          }
        </p>
      </div>

      <div className="border p-6 rounded-xl bg-gray-50 space-y-4">
        <h4 className="font-semibold text-xl">Secure Document Upload (Mock)</h4>
        <p className="text-gray-600">Max file size 5MB (PDF or JPG).</p>
        <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"/>
        
        <label className="flex items-center space-x-3 pt-3">
          <input 
            type="checkbox" 
            checked={bookingData.traveler.passportSubmitted}
            onChange={handleSubmission}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-md font-medium text-gray-800">I confirm the mock-submission of my travel documents is complete.</span>
        </label>
      </div>
    </div>
  );
};

/** 5. Seat Map Step */
const SeatMapStep = ({ bookingData, setBookingData }) => {
  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatColumns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selectedSeat = bookingData.seat;

  const handleSeatSelect = (row, col) => {
    const seatId = `${row}${col}`;
    setBookingData(prev => ({ ...prev, seat: seatId }));
  };

  const getSeatClass = (row, col) => {
    const seatId = `${row}${col}`;
    if (seatId === selectedSeat) {
      return 'bg-green-500 text-white shadow-lg ring-2 ring-green-700';
    }
    // Mock unavailable seats
    if ((row === 'A' || row === 'F') && (col === 1 || col === 2 || col === 9 || col === 10)) {
      return 'bg-red-400 text-white cursor-not-allowed opacity-70';
    }
    // Mock premium seats (Exit row or First 3 rows)
    if (col <= 3 || col === 8) {
      return 'bg-yellow-200 text-gray-800 hover:bg-yellow-300 border border-yellow-400';
    }
    return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800">5. Seat Map Selection</h2>
      <div className="bg-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-lg border-t-8 border-gray-400">
        <div className="text-center font-extrabold text-xl mb-6 text-gray-800">AIRCRAFT CABIN</div>

        {/* Seat Grid */}
        <div className="space-y-1">
          {/* Column Numbers */}
          <div className="grid grid-cols-12 gap-1 font-mono text-sm mb-2 text-center font-bold text-gray-600">
            <span className="col-span-1"></span>
            {seatColumns.map(col => <span key={`col-${col}`} className="col-span-1">{col}</span>)}
          </div>

          {/* Seat Rows */}
          {seatRows.map(row => (
            <React.Fragment key={row}>
              <div className="grid grid-cols-12 gap-1 items-center">
                <span className="col-span-1 font-bold text-lg text-gray-700 text-center">{row}</span>
                {seatColumns.map(col => (
                  <button 
                    key={`${row}${col}`}
                    onClick={() => handleSeatSelect(row, col)}
                    disabled={(row === 'A' || row === 'F') && (col === 1 || col === 2 || col === 9 || col === 10)}
                    className={`col-span-1 w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold transition duration-200 transform hover:scale-110 ${getSeatClass(row, col)}`}
                  >
                    {row}{col}
                  </button>
                ))}
                <span className="col-span-1 font-bold text-lg text-gray-700 text-center">{row}</span>
              </div>
              {/* Mock Aisle */}
              {row === 'C' && (
                <div className="h-6 bg-gray-300 my-3 rounded-full text-center text-sm text-gray-600 flex items-center justify-center font-semibold">AISLE / WALKWAY</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-100 border border-blue-400 rounded-xl shadow-md">
        <p className="font-bold text-xl text-blue-800">Selected Seat: <span className="text-red-600">{selectedSeat || 'Please Select'}</span></p>
      </div>
    </div>
  );
};

/** 6. Review & Payment Step */
const ReviewPaymentStep = ({ bookingData, nextStep }) => {
  const { flight, traveler, seat } = bookingData;

  const totalPayable = useMemo(() => {
    if (!flight) return 0;
    const baseFare = flight.price;
    const taxes = 3500;
    const seatFee = seat ? 1200 : 0;
    return baseFare + taxes + seatFee;
  }, [flight, seat]);
  
  // Custom alert function (replacement for window.alert)
  const alertModal = (title, message) => {
      // Logic to display a custom modal/toast, which is handled in the main App component state
      // For this isolated component, we rely on the parent to handle the state change.
      console.log(`${title}: ${message}`);
  };
  
  const handlePayment = () => {
      // Mock payment process...
      // Since we cannot use window.alert, we'll rely on the next step for confirmation.
      nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800">6. Review & Mock Payment</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Summary (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-semibold text-blue-700 border-b-2 pb-2">Booking Summary</h3>
          
          <div className="bg-white p-5 rounded-xl border shadow-lg space-y-4">
            <p className="font-bold text-xl text-gray-900 flex justify-between">
              Flight Details
              <span className="text-base text-gray-500 font-normal">{flight.airline}</span>
            </p>
            <p className="text-md">
              <span className="font-bold">{flight.departure}</span> to <span className="font-bold">{flight.arrival}</span> | Duration: {flight.duration}
            </p>
            
            <h4 className="font-bold mt-4 text-gray-900">Passenger Information:</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
              <p>Name: <strong>{traveler.firstName} {traveler.lastName}</strong></p>
              <p>Email: <strong>{traveler.email}</strong></p>
              <p>Passport: <strong>{traveler.passportNumber}</strong></p>
              <p>DOB: <strong>{traveler.dob}</strong></p>
              <p className="col-span-2">Selected Seat: <span className="text-red-600 font-extrabold text-lg">{seat || 'Not Selected'}</span></p>
            </div>
          </div>
        </div>
        
        {/* Price & Payment (Right Column) */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-2xl h-fit border border-blue-200">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 border-blue-300 pb-2">Total Price</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between"><span>Base Fare:</span><span>₹{flight.price.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span>Taxes & Fees:</span><span>₹3,500</span></div>
            <div className="flex justify-between"><span>Seat Fee:</span><span>{seat ? '₹1,200' : '₹0'}</span></div>
            <div className="h-0.5 bg-blue-300 my-4"></div>
            <div className="flex justify-between text-2xl font-extrabold text-blue-900">
              <span>Total Payable:</span>
              <span>₹{totalPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-2">Payment Method (Mock)</h4>
            <select className="w-full p-3 border rounded-lg">
              <option>UPI/Netbanking</option>
              <option>Credit Card (Mock)</option>
            </select>
          </div>

          <button 
            onClick={handlePayment} 
            className="w-full mt-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition transform hover:scale-[1.01]"
          >
            Confirm & Pay ₹{totalPayable.toLocaleString('en-IN')}
          </button>
        </div>
      </div>
    </div>
  );
};

/** 7. Confirmation Step */
const ConfirmationStep = ({ bookingData, resetApp }) => {
  const bookingId = useMemo(() => `ST-2025-${Math.floor(Math.random() * 900000) + 100000}`, []);
  const { flight, traveler, seat } = bookingData;

  return (
    <div className="text-center p-12 border-4 border-dashed border-green-400 bg-green-50 rounded-2xl shadow-2xl space-y-6">
      <div className="text-7xl text-green-600">✅</div>
      <h3 className="text-4xl font-extrabold text-green-700">BOOKING CONFIRMED! E-TICKET ISSUED</h3>
      <p className="text-xl text-gray-700">Thank you for choosing Senternet Sky-Travel. Your simulated itinerary is ready.</p>
      
      <div className="bg-white inline-block p-8 rounded-xl shadow-2xl border-t-4 border-green-500 text-left">
        <p className="text-sm text-gray-500">Official Booking Reference:</p>
        <p className="text-4xl font-mono text-red-600 font-bold">{bookingId}</p>
        <div className="mt-6 space-y-2 text-lg text-gray-800">
          <p><strong>Passenger:</strong> {traveler.firstName} {traveler.lastName}</p>
          <p><strong>Flight:</strong> {flight.airline} ({flight.departure} → {flight.arrival})</p>
          <p><strong>Departure Time:</strong> <span className="font-semibold">{flight.time}</span></p>
          <p><strong>Confirmed Seat:</strong> <span className="font-extrabold text-red-700">{seat || 'Auto Assigned'}</span></p>
        </div>
      </div>

      <button onClick={resetApp} className="mt-8 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
        Start a New Search
      </button>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState(initialBookingState);
  
  // AI Assistant State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('Hello! I am your Senternet AI Travel Assistant. Ask me anything about visas, baggage, or travel tips!');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Modal State (Custom alert replacement)
  const [modal, setModal] = useState({ visible: false, title: '', message: '' });

  const nextStep = () => {
    setStep(prev => Math.min(steps.length, prev + 1));
  };

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const resetApp = () => {
    setStep(1);
    setBookingData(initialBookingState);
    setAiQuery('');
    setAiResponse('Hello! I am your Senternet AI Travel Assistant. Ask me anything about visas, baggage, or travel tips!');
    setIsAiLoading(false);
  };

  // Function to show custom alert modal
  const alertModal = (title, message) => {
      setModal({ visible: true, title, message });
  };
  
  // Custom validation logic
  const isCurrentStepValid = useMemo(() => {
    switch (step) {
      case 1: 
        return !!bookingData.flight;
      case 2: // AI Assistant is optional
        return true;
      case 3: // Passenger Details
        const t = bookingData.traveler;
        return t.firstName.length > 0 && t.lastName.length > 0 && t.dob.length > 0 && t.passportNumber.length >= 6 && t.email.includes('@');
      case 4: // Documents
        return bookingData.traveler.passportSubmitted;
      case 5: // Seat Map
        return !!bookingData.seat;
      case 6: // Review & Pay (Mock payment is always valid for next step)
        return true; 
      default:
        return false;
    }
  }, [step, bookingData]);

  const CurrentStepComponent = useMemo(() => {
    switch (step) {
      case 1: return FlightSearchStep;
      case 2: return AIAssistantStep;
      case 3: return PassengerDetailsStep;
      case 4: return DocumentSubmissionStep;
      case 5: return SeatMapStep;
      case 6: return ReviewPaymentStep;
      case 7: return ConfirmationStep;
      default: return () => <div>Error: Step not found.</div>;
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* --- Custom Modal (Replaces alert) --- */}
      {modal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full border-t-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{modal.title}</h3>
            <p className="text-gray-700 mb-6">{modal.message}</p>
            <button 
              onClick={() => setModal({ visible: false, title: '', message: '' })}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* --- Header --- */}
      <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Senternet Sky-Travel 🚀</h1>
          <button onClick={resetApp} className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition text-sm font-medium hidden sm:block">Start New Search</button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        
        {/* --- Progress Steps Navigation --- */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gray-300 after:top-1/2 after:-translate-y-1/2 after:z-0">
            {steps.map(s => (
              <div key={s.id} className="flex flex-col items-center z-10 w-[calc(100%/7)] cursor-pointer" onClick={() => s.id < step && setStep(s.id)}>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 
                    ${s.id === step ? 'bg-red-500 text-white ring-4 ring-red-200' : 
                      s.id < step ? 'bg-green-500 text-white' : 
                      'bg-white text-gray-500 border-2 border-gray-300'}`
                  }
                >
                  {s.id}
                </div>
                <span className={`text-xs mt-2 text-center hidden sm:block ${s.id === step ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>{s.title}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-xl font-bold text-red-600 sm:hidden">{steps.find(s => s.id === step)?.title}</div>
        </div>

        {/* --- Content Area --- */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200">
          <CurrentStepComponent 
            bookingData={bookingData} 
            setBookingData={setBookingData} 
            nextStep={nextStep} 
            resetApp={resetApp}
            // Props specific to AI Step
            aiQuery={aiQuery}
            setAiQuery={setAiQuery}
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
            isAiLoading={isAiLoading}
            setIsAiLoading={setIsAiLoading}
          />

          {/* --- Navigation Buttons --- */}
          <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              // FIXED: Consolidated className attributes
              className={`px-6 py-3 rounded-xl text-md font-medium transition disabled:opacity-50 ${
                step > 1 
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              ← Previous
            </button>
            <button 
              onClick={nextStep} 
              disabled={step === 7 || !isCurrentStepValid}
              // FIXED: Consolidated className attributes
              className={`px-6 py-3 rounded-xl text-md font-bold text-white transition disabled:opacity-50 ${
                isCurrentStepValid && step < 7 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-red-400 cursor-not-allowed'
              }`}
            >
              {step === 6 ? 'Complete Mock Payment' : 'Next Step →'}
            </button>
          </div>
        </div>
      </main>

      {/* SENTERNET TECHNOLOGIES Mandatory Footer */}
      <footer className="mt-12 bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto text-center text-sm space-y-3">
            <h4 className="text-xl font-bold text-red-400">SENTERNET TECHNOLOGIES</h4>
            <p>&copy; 2025 Senternet Sky-Travel. Website Template Designed & Developed by SENTERNET TECHNOLOGIES.</p>
            <div className="flex flex-wrap justify-center space-x-4 pt-2 text-gray-300">
                <span className="font-bold">Location: Aranthangi, Pudukkottai</span>
                <span className="font-bold">|</span>
                <a href="https://wa.me/918190038085" target="_blank" className="hover:text-red-400 transition">WhatsApp: +91 81900 38085</a>
                <span className="font-bold">|</span>
                <a href="mailto:senternettechnologies@gmail.com" className="hover:text-red-400 transition">Email: senternettechnologies@gmail.com</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
