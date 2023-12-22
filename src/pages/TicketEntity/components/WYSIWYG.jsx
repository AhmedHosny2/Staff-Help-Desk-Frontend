import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";


export default function  WYSIWYG() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
  
    return (
      <div>
        <h1>Welcome to Ageee Dev</h1>
  
        <JoditEditor
          ref={editor}
          value={content}
        />
  
      </div>
    );
}


