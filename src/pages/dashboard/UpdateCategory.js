import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams();

  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/category/one?categoryId=${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(response?.data?.data);
      } catch (error) {
        setPageError(error?.response?.data?.message || "Server error");
      } finally {
        setPageLoading(false);
      }
    };

    fetchCategory();
  }, id);

  const handleAddNewCategory = async (e) => {
    e.preventDefault();

    const categoryName = e.target.categoryName.value;

    const data = {};

    if (categoryName && categoryName !== category.categoryName) {
      data.categoryName = categoryName;
    }

    if (Object.keys(data).length === 0) {
      setPageError("There is no changes in your category information");
      return;
    }

    try {
      setPageLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER}/api/category/update?categoryId=${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategory(response?.data?.data);
      toast.success(response?.data?.message || "Category updated successfully");
    } catch (error) {
      setPageError(error?.response?.data?.message || "Server error");
    } finally {
      setPageLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card w-full max-w-md border bg-white border-gray-300 py-4">
        <h1 className="text-center pt-2 text-xl font-bold">Update Category</h1>
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
                defaultValue={category?.categoryName}
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
                {pageLoading ? "Updating..." : "Update Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
