import React, { useState } from "react";
import FooterPage from "../components/Footer/FooterPage";

export const BookNowPage = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    guest: 0,
    date: "",
    time: "",
    confirm: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value === "Yes" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add form submission logic here
    console.log(formData);
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
                        name="fName"
                        id="fName"
                        value={formData.fName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="lName"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lName"
                        id="lName"
                        value={formData.lName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
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
                    How many guest are you bringing?
                  </label>
                  <input
                    type="number"
                    name="guest"
                    id="guest"
                    value={formData.guest}
                    onChange={handleInputChange}
                    placeholder="5"
                    min="0"
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
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                        id="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Are you confirm?
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="confirm"
                        id="radioButton1"
                        value="Yes"
                        checked={formData.confirm}
                        onChange={handleRadioChange}
                        className="h-5 w-5"
                      />
                      <label
                        htmlFor="radioButton1"
                        className="pl-3 text-base font-medium text-[#07074D]"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="confirm"
                        id="radioButton2"
                        value="No"
                        checked={!formData.confirm}
                        onChange={handleRadioChange}
                        className="h-5 w-5"
                      />
                      <label
                        htmlFor="radioButton2"
                        className="pl-3 text-base font-medium text-[#07074D]"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default BookNowPage;