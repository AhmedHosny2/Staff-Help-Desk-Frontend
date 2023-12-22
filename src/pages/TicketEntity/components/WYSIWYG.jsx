import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import updateButton from "../../../assets/updateButton.svg";
import saveButton from "../../../assets/saveButton.svg";

export default function WYSIWYG() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleSolveButton = () => {
    console.log(editor.current);
  };

  const handleUpdateButton = () => {
    console.log(editor.current);
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
            onClick={handleSolveButton}
          >
            <img src={saveButton} alt="Save & Close Ticket" className="mr-2" />
            Save & Close Ticket
          </button>
          <button
            className="flex items-center btn btn-info"
            onClick={handleUpdateButton}
          >
            <img src={updateButton} alt="Update" className="mr-2" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
