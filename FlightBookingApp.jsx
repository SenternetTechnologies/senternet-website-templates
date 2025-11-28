<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SENTERNET Air - Flight Booking</title>
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #3b82f6; /* Blue-500 */
            --secondary-color: #10b981; /* Emerald-500 */
            --bg-color: #f3f4f6; /* Gray-100 */
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
        }
        .form-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        .tab-button.active {
            background-color: var(--primary-color);
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }
        .shadow-custom {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }
        .btn-primary {
            background-color: var(--secondary-color);
            transition: background-color 0.3s ease;
        }
        .btn-primary:hover {
            background-color: #059669; /* Emerald-600 */
        }
        .input-field {
            border: 1px solid #d1d5db;
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        .input-field:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
        .footer-bg {
            background-color: #1f2937; /* Gray-800 */
        }
    </style>
</head>
<body class="antialiased">

    <!-- Header & Navigation -->
    <header class="bg-white shadow-custom sticky top-0 z-10">
        <div class="form-container flex justify-between items-center py-4">
            <h1 class="text-3xl font-bold text-gray-900">
                <span class="text-blue-600">SENTERNET</span> <span class="text-gray-900">Air</span>
            </h1>
            <nav class="hidden md:flex space-x-6 text-gray-600 font-medium">
                <a href="#" class="hover:text-blue-500 transition duration-150">Flights</a>
                <a href="#" class="hover:text-blue-500 transition duration-150">Hotels</a>
                <a href="#" class="hover:text-blue-500 transition duration-150">Packages</a>
                <a href="#" class="hover:text-blue-500 transition duration-150">Check-in</a>
            </nav>
        </div>
    </header>

    <main class="py-12">
        <div class="form-container bg-white rounded-xl shadow-2xl p-6 md:p-10">
            <h2 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Book Your Flight Now</h2>

            <!-- Travel Type Tabs -->
            <div class="flex flex-wrap justify-center space-x-2 mb-8">
                <button id="oneWayTab" onclick="selectTab('oneWay')" class="tab-button active px-6 py-2 rounded-full font-semibold transition duration-200">One-Way</button>
                <button id="roundTripTab" onclick="selectTab('roundTrip')" class="tab-button px-6 py-2 rounded-full font-semibold transition duration-200 text-gray-700 bg-gray-200 hover:bg-gray-300">Round Trip</button>
            </div>

            <!-- Booking Form -->
            <form id="bookingForm">
                <!-- Trip Details (Origin, Destination, Dates) -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <!-- Origin -->
                    <div class="col-span-1 md:col-span-1">
                        <label for="origin" class="block text-sm font-medium text-gray-700 mb-2">Flying From</label>
                        <input type="text" id="origin" name="origin" placeholder="City or Airport" required
                               class="input-field w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>

                    <!-- Destination -->
                    <div class="col-span-1 md:col-span-1">
                        <label for="destination" class="block text-sm font-medium text-gray-700 mb-2">Flying To</label>
                        <input type="text" id="destination" name="destination" placeholder="City or Airport" required
                               class="input-field w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>

                    <!-- Departure Date -->
                    <div class="col-span-1 md:col-span-1">
                        <label for="departureDate" class="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                        <input type="date" id="departureDate" name="departureDate" required
                               class="input-field w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                    </div>

                    <!-- Return Date (Only for Round Trip) -->
                    <div class="col-span-1 md:col-span-1" id="returnDateGroup">
                        <label for="returnDate" class="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                        <input type="date" id="returnDate" name="returnDate"
                               class="input-field w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                    </div>
                </div>

                <!-- Passenger and Class Details -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <!-- Passengers -->
                    <div class="col-span-1">
                        <label for="passengers" class="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                        <select id="passengers" name="passengers" required
                                class="input-field w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white">
                            <option value="1">1 Passenger</option>
                            <option value="2">2 Passengers</option>
                            <option value="3">3 Passengers</option>
                            <option value="4">4+ Passengers</option>
                        </select>
                    </div>

                    <!-- Travel Class -->
                    <div class="col-span-1">
                        <label for="travelClass" class="block text-sm font-medium text-gray-700 mb-2">Travel Class</label>
                        <select id="travelClass" name="travelClass" required
                                class="input-field w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white">
                            <option value="Economy">Economy</option>
                            <option value="Premium Economy">Premium Economy</option>
                            <option value="Business">Business</option>
                            <option value="First Class">First Class</option>
                        </select>
                    </div>

                    <!-- Search Button -->
                    <div class="col-span-1 flex items-end">
                        <button type="submit" class="btn-primary w-full p-3 rounded-lg text-white font-bold text-lg hover:shadow-lg transition duration-200 transform hover:scale-[1.01]">
                            Search Flights
                        </button>
                    </div>
                </div>

                <!-- Message Box for JS feedback -->
                <div id="messageBox" class="hidden p-4 rounded-lg bg-blue-100 text-blue-800 border border-blue-300 font-medium transition duration-300">
                    <!-- Feedback message will appear here -->
                </div>
            </form>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer-bg text-white py-10 mt-12">
        <div class="form-container grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Company Info -->
            <div>
                <h3 class="text-xl font-bold mb-4 text-blue-400">SENTERNET Air</h3>
                <p class="text-gray-400 text-sm">Your reliable partner in digital travel solutions.</p>
                <p class="text-sm mt-4">A subsidiary of <span class="font-semibold text-white">SENTERNET TECHNOLOGIES</span>.</p>
            </div>

            <!-- Quick Links -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="#" class="hover:text-blue-400 transition">About Us</a></li>
                    <li><a href="#" class="hover:text-blue-400 transition">Careers</a></li>
                    <li><a href="#" class="hover:text-blue-400 transition">FAQ</a></li>
                    <li><a href="#" class="hover:text-blue-400 transition">Privacy Policy</a></li>
                </ul>
            </div>

            <!-- Destinations -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Top Destinations</h3>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li>New York</li>
                    <li>Chennai</li>
                    <li>Dubai</li>
                    <li>Singapore</li>
                </ul>
            </div>

            <!-- Contact Information (Senternet Details) -->
            <div>
                <h3 class="text-lg font-semibold mb-4 text-white">Contact SENTERNET</h3>
                <p class="text-sm text-gray-400">Location: Aranthangi, Pudukkottai</p>
                <p class="text-sm text-gray-400 mt-2">WhatsApp: <a href="tel:+918190038085" class="text-blue-300 hover:text-blue-400">+91 81900 38085</a></p>
                <p class="text-sm text-gray-400">Gmail: <a href="mailto:senternettechnologies@gmail.com" class="text-blue-300 hover:text-blue-400">senternettechnologies@gmail.com</a></p>
            </div>
        </div>
        <div class="form-container border-t border-gray-700 mt-8 pt-6 text-center">
            <p class="text-sm text-gray-500">&copy; 2025 SENTERNET TECHNOLOGIES. All rights reserved.</p>
        </div>
    </footer>

    <!-- JavaScript Functions -->
    <script>
        // Global variable to track the selected trip type
        let tripType = 'oneWay';

        document.addEventListener('DOMContentLoaded', () => {
            // Set initial min date for departure to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('departureDate').setAttribute('min', today);
            document.getElementById('returnDate').setAttribute('min', today);

            // Hide return date by default for one-way
            document.getElementById('returnDateGroup').classList.add('hidden');
            document.getElementById('returnDate').removeAttribute('required');

            // Attach form submission listener
            document.getElementById('bookingForm').addEventListener('submit', handleFormSubmit);

            // Listen for changes in the departure date to update the return date minimum
            document.getElementById('departureDate').addEventListener('change', updateReturnDateMin);
        });

        /**
         * Updates the min attribute of the return date input based on the departure date.
         */
        function updateReturnDateMin() {
            const departureDate = document.getElementById('departureDate').value;
            const returnDateInput = document.getElementById('returnDate');
            
            // Set the minimum selectable date for return to be the departure date
            returnDateInput.setAttribute('min', departureDate);
            
            // If the currently selected return date is earlier than the new departure date, clear it.
            if (returnDateInput.value && departureDate && returnDateInput.value < departureDate) {
                returnDateInput.value = departureDate;
            }
        }

        /**
         * Toggles between One-Way and Round Trip tabs and updates the UI accordingly.
         * @param {string} type - 'oneWay' or 'roundTrip'
         */
        function selectTab(type) {
            tripType = type;
            const oneWayTab = document.getElementById('oneWayTab');
            const roundTripTab = document.getElementById('roundTripTab');
            const returnDateGroup = document.getElementById('returnDateGroup');
            const returnDateInput = document.getElementById('returnDate');

            // Update button styles
            oneWayTab.classList.remove('active', 'bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            roundTripTab.classList.remove('active', 'bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            oneWayTab.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            roundTripTab.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            
            if (type === 'oneWay') {
                oneWayTab.classList.add('active');
                roundTripTab.classList.remove('active');
                returnDateGroup.classList.add('hidden');
                returnDateInput.removeAttribute('required');
            } else { // roundTrip
                roundTripTab.classList.add('active');
                oneWayTab.classList.remove('active');
                returnDateGroup.classList.remove('hidden');
                returnDateInput.setAttribute('required', 'required');
                // Ensure return date min is set when switching to round trip
                updateReturnDateMin();
            }
        }

        /**
         * Handles the form submission (simulated booking logic).
         * @param {Event} e - The form submit event.
         */
        function handleFormSubmit(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => { data[key] = value; });

            // Basic validation
            if (data.origin.trim() === '' || data.destination.trim() === '' || data.departureDate === '') {
                 showMessage('Please fill in all required fields (Origin, Destination, Departure Date).', 'bg-red-100 text-red-800 border-red-300');
                 return;
            }

            if (data.origin.toLowerCase() === data.destination.toLowerCase()) {
                 showMessage('Origin and Destination cannot be the same.', 'bg-yellow-100 text-yellow-800 border-yellow-300');
                 return;
            }

            if (tripType === 'roundTrip' && (!data.returnDate || data.returnDate < data.departureDate)) {
                 showMessage('For Round Trip, please select a valid Return Date on or after the Departure Date.', 'bg-yellow-100 text-yellow-800 border-yellow-300');
                 return;
            }

            // --- Simulation of a successful search/booking ---
            console.log('Flight Search Parameters:', data);
            
            let message = `Searching for a ${tripType.toUpperCase()} flight from ${data.origin} to ${data.destination} for ${data.passengers} passenger(s) in ${data.travelClass} class on ${data.departureDate}.`;
            
            if (tripType === 'roundTrip') {
                message += ` Returning on ${data.returnDate}.`;
            }

            message += `\n\n(This is a simulation. A real booking API call would happen here.)`;

            showMessage(message, 'bg-green-100 text-green-800 border-green-300');
            
            // In a real application, you would make an API call here.
            // Example: fetch('/api/search-flights', { method: 'POST', body: JSON.stringify(data) })
        }

        /**
         * Displays a message in the designated message box.
         * @param {string} message - The text message to display.
         * @param {string} classes - Tailwind classes for styling the message box (e.g., color).
         */
        function showMessage(message, classes) {
            const messageBox = document.getElementById('messageBox');
            messageBox.textContent = message;
            messageBox.className = `p-4 rounded-lg font-medium transition duration-300 ${classes}`;
            messageBox.classList.remove('hidden');

            // Automatically hide after 8 seconds (8000 milliseconds)
            clearTimeout(messageBox.timer);
            messageBox.timer = setTimeout(() => {
                messageBox.classList.add('hidden');
                messageBox.textContent = '';
            }, 8000);
        }
    </script>

</body>
</html>
