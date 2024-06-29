import { useState } from "react";

const AddMenu = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const handleAddNewMenu = async (e) => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card w-full max-w-md border bg-white border-gray-300 py-4">
        <h1 className="text-center pt-2 text-xl font-bold">Add Package</h1>
        <div className="card-body">
          <form onSubmit={handleAddNewMenu}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration (month)</span>
              </label>
              <select
                name="duration"
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled selected>
                  Select a month
                </option>
                <option value="1 month">1 month</option>
                <option value="2 month">2 month</option>
                <option value="3 month">3 month</option>
                <option value="4 month">4 month</option>
                <option value="5 month">5 month</option>
                <option value="6 month">6 month</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Fee</span>
              </label>
              <input
                type="number"
                name="fee"
                placeholder="Package fee"
                className="input input-bordered"
                required
              />
              {pageError && (
                <label className="label">
                  <p className="label-text-alt text-red-600">{pageError}</p>
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-neutral text-sm"
                disabled={pageLoading}
              >
                {pageLoading ? "Adding..." : "Add Menu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
