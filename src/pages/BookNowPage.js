import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FooterPage from "../components/Footer/FooterPage";

function BookNowPage() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ date, time, name, phone, guests });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center pt-8 px-10">
        <div>
          <h1 className="font-medium text-[100px] text-center">Book A Table</h1>
          <p>
            We consider all the drivers of change gives you the components you
            need to change to create a truly happens.
          </p>
        </div>
        <div className="flex flex-wrap justify-center pt-10 pb-10 w-1/2">
          <form
            onSubmit={handleSubmit}
            className="container mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-bold mb-2"
              >
                  Date
                </label>
                <DatePicker
                  id="date"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Time
                </label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Time</option>
                  <option value="06:30 PM">06:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                  {/* Add more time options as needed */}
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="shadow appearance-none border rounded-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="X-XXX-XXX-XXXX"
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="guests"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Total Person
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              >
                Book A Table
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default BookNowPage;