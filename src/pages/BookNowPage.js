import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { subDays, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BookNowPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const guestNumber = parseInt(event.target.guestNumber.value);
    const time = event.target.time.value;
    const limit = parseInt(event.target.limit.value);

    if (guestNumber < 1) {
      setPageError("At least 1 member is required");
      return;
    }

    if (guestNumber > 100) {
      setPageError("Guest number is exceeds our capacity");
      return;
    }

    if (limit < 1) {
      setPageError("Limit must be at least 1 hour");
      return;
    }

    if (!startDate) {
      setPageError("Date is required");
      return;
    }

    const data = {
      firstName,
      lastName,
      guestNumber,
      time,
      date: startDate,
      limit,
    };

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }

    try {
      setPageError("");
      setPageLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/reservation/book`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response?.data?.message ||
          "Reservation booked successfully, check your email for more details"
      );
      setStartDate(null);
      event.target.reset();
    } catch (error) {
      console.log("error", error);
      setPageError(error?.response?.data?.error || "An error occurred");
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <div className="min-h-screen container mx-auto pt-6 pb-12">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="font-bold text-4xl text-center">Book A Table</h1>
        <p className="text-gray-500 text-sm px-12">
          We consider all the drivers of change gives you the components you
          need to create a truly memorable experience.
        </p>
      </div>
      <div className="flex flex-wrap justify-center pt-10 pb-10">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmit}>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="fName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="guest"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  How many guests are you bringing?
                </label>
                <input
                  type="number"
                  name="guestNumber"
                  placeholder="05"
                  required
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="date"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      includeDateIntervals={[
                        {
                          start: subDays(new Date(), 1),
                          end: addDays(new Date(), 5),
                        },
                      ]}
                      placeholderText="Select a day"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      required
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="time"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="limit"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Booking Duration Limit (in hours)
                </label>
                <input
                  type="number"
                  name="limit"
                  placeholder="Enter limit"
                  required
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <label className="mb-2 text-sm font-medium text-red-600 dark:text-white">
                {pageError}
              </label>

              <div className="mt-4">
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-neutral py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  disabled={pageLoading}
                >
                  {pageLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNowPage;
