import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { toBase64 } from "../../utils/ConvertImage";

const AddCategory = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const handleAddNewCategory = async (e) => {
    e.preventDefault();

    const categoryName = e.target.categoryName.value;
    const description = e.target.description.value;
    const icon = e.target.icon.files[0];

    const data = {
      categoryName,
      description,
    };
    try {
      data.icon = await toBase64(icon);
    } catch (error) {
      setPageError("An error occurred while converting the image");
      return;
    }

    try {
      setPageLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/category/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      e.target.reset();
      toast.success(response?.data?.message || "Category added successfully");
    } catch (error) {
      setPageError(error?.response?.data?.message || "Server error");
    } finally {
      setPageLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card w-full max-w-md border bg-white border-gray-300 py-4">
        <h1 className="text-center pt-2 text-xl font-bold">Add Category</h1>
        <div className="card-body">
          <form onSubmit={handleAddNewCategory}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                type="text"
                name="categoryName"
                placeholder="Category Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                placeholder="Category description"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Icon</span>
              </label>
              <input
                type="file"
                name="icon"
                className="mt-2 rounded-md max-h-48"
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
                {pageLoading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
