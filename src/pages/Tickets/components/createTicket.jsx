import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { customFetch } from "../../../utils/Fetch";
import SaveIcon from "@mui/icons-material/Save";
import { getToastStyle, removeToast } from "../../../utils/toastStyle";
import toast, { Toaster } from "react-hot-toast";
export default function CreatTicketComponent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    issue_type: null,
    sub_category: null,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [message, setMessage] = useState("");
  const handleButtonClick = (e) => {
    const body = {
      title: title,
      description: description,
      issue_type: formData.issue_type,
      sub_category: formData.sub_category,
    };
    const fetchData = async () => {
      const { err, isPen, newData, newStatus, newStatusText, newMessage } =
        await customFetch(
          process.env.REACT_APP_TICKETS_URL + "/createTicket",
          "POST",
          body
        );
      if (newStatusText === "success") {
        // Step 1: Save toast id using var
        var toastId = toast.success(
          "Successfully creat ticket",
          getToastStyle()
        );
        setTimeout(() => {
          navigate("/home/user");
        }, 4000);
      } else {
        // Step 2: This is the other toast (for error)
        toastId = toast.error(newMessage, getToastStyle());
      }
      // Step 3: always call this function
      removeToast(toast, toastId);
    };
    fetchData();
  };

  const handleIssueTypeChange = (selectedIssueType) => {
    // Handle the change of issue type
    setFormData({
      ...formData,
      issue_type: selectedIssueType,
      sub_category: null, // Reset sub_category when issue_type changes
    });
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    // Handle the change of sub_category
    setFormData({
      ...formData,
      sub_category: selectedSubCategory,
    });
  };
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Have a problem?</h1>
            <p className="py-6">Create your Ticket for free.</p>
          </div>
          <div className="card shrink-0 w-full max-w-3xl shadow-2xl">
            <div className="card-body">
              <div className="flex lg:flex-row flex-col">
                <div className="flex-1 lg:mr-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text" required>
                        Title
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Internet Connection Issue"
                      className="input input-bordered"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <select
                className="select select-bordered w-full max-w-xs  mt-4"
                value={formData.issue_type || ""}
                onChange={(e) => handleIssueTypeChange(e.target.value)}
              >
                <option value="">Select issue type</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="Network">Network</option>
              </select>

              {formData.issue_type && (
                <div className="mt-4">
                  <select
                    className="select select-bordered w-full max-w-xs "
                    value={formData.sub_category || ""}
                    onChange={(e) => handleSubCategoryChange(e.target.value)}
                  >
                    <option value="">Select a category</option>

                    {formData.issue_type === "Hardware" && (
                      <>
                        <option value="desktops">Desktops</option>
                        <option value="laptops">Laptops</option>
                      </>
                    )}
                    {formData.issue_type === "Software" && (
                      <>
                        <option value="operating system">
                          Operating System
                        </option>
                        <option value="application software">
                          Application Software
                        </option>
                      </>
                    )}
                    {formData.issue_type === "Network" && (
                      <>
                        <option value="email issues">Email Issues</option>
                        <option value="internet connection problems">
                          Internet Connection Problems
                        </option>
                      </>
                    )}
                  </select>

                  {formData.sub_category && (
                    <textarea
                      className="textarea textarea-success flex w-full my-5"
                      placeholder="Describe the problem..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  )}
                </div>
              )}

              <div className="form-control mt-1">
                <button className="btn btn-success" onClick={handleButtonClick}>
                  <SaveIcon />
                  Creat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
