import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import updateButton from "../../../assets/updateButton.svg";
import saveButton from "../../../assets/saveButton.svg";
import { customFetch } from "../../../utils/Fetch";
import { useNavigate } from "react-router-dom";

export default function WYSIWYG() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  // put this in use effect
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!localStorage.getItem("role")) navigate("/");
  //       setUserType(localStorage.getItem("role"));
  //
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const editor = useRef(null);
  const [content, setContent] = useState("");
    const [status, setStatus] = useState(null);
  const handleButtonClick = async  (e) => {
    console.log(e.target.value);
    const body = {
      ticketId: window.location.pathname.split("/")[2],
      solution: editor.current.value,
      status: e.target.value,
    };
    const { newStatus } = await customFetch(
      process.env.REACT_APP_TICKETS_URL + "/solveTicket",
      "PUT",
      body
    );
    setStatus(newStatus);
    if(newStatus === 200)navigate("/ticket");
    else alert("Error");
  };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-3/4">
        <div className="mt-4">
          <JoditEditor ref={editor} value={content} />
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="flex items-center btn btn-success"
            value="closed"
            onClick={handleButtonClick}
          >
            <img src={saveButton} alt="Save & Close Ticket" className="mr-2" />
            Save & Close Ticket
          </button>
          <button
            className="flex items-center btn btn-info"
            value="updated"
            onClick={handleButtonClick}
          >
            <img src={updateButton} alt="Update" className="mr-2" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
