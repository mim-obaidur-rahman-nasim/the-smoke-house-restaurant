import axios from "axios";
import { useEffect, useState } from "react";
import { toBase64 } from "../../utils/ConvertImage";
import toast from "react-hot-toast";

const AddMenu = () => {
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/category/all`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddNewMenu = async (e) => {
    e.preventDefault();

    const foodName = e.target.foodName.value;
    const categoryId = e.target.categoryId.value;
    const price = parseFloat(e.target.price.value);
    const imageURL = e.target.imageURL.files[0];

    const data = {
      foodName,
      categoryId,
      price,
    };

    try {
      data.imageURL = await toBase64(imageURL);
    } catch (error) {
      setPageError("An error occurred while converting the image");
      return;
    }

    try {
      setPageError("");
      setPageLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/menu/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      e.target.reset();
      toast.success(response?.data?.message || "Menu added successfully");
    } catch (error) {
      setPageError(error?.response?.data?.message || "Server error");
    } finally {
      setPageLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card w-full max-w-md border bg-white border-gray-300 py-4">
        <h1 className="text-center pt-2 text-xl font-bold">Add Menu</h1>
        <div className="card-body">
          <form onSubmit={handleAddNewMenu}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                type="text"
                name="foodName"
                placeholder="Food name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                name="categoryId"
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled selected>
                  Select related category
                </option>

                {categories?.map((data) => {
                  const { _id, categoryName } = data;
                  return <option value={_id}>{categoryName}</option>;
                })}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Food price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                name="imageURL"
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
