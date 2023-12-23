import { useState, useEffect } from "react";
import { customFetch } from "../../utils/Fetch";

export default function Bot() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { user: "Obi-Wan Kenobi", text: "You were the Chosen One!" },
    { user: "Anakin", text: "I hate you!" },
    { user: "Anakin", text: "I hate you!" },
    { user: "Anakin", text: "I hate you!" },
    { user: "Anakin", text: "I hate you!" },
    { user: "Anakin", text: "I hate you!" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { err, isPen, newData, newStatus } = await customFetch(
          process.env.REACT_APP_USERS_URL,
          "GET"
        );

        setError(err);
        setIsPending(isPen);
        setData(newData);
        setStatus(newStatus);
      } catch (error) {
        // Handle any additional errors if necessary
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { user: "User", text: inputText }]);
      setInputText("");
    }
  };

  const handleCloseChat = () => {
    // Add logic to close the chat, for example, navigate to another page or toggle a state
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 bg-base-200 h-96 overflow-y-auto">
      <div className="h-100 overflow-y-auto flex flex-col-reverse">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat mt-4 ${index === 0 ? "chat-end" : ""}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-header">{message.user}</div>
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}

        <button className="btn btn-circle btn-outline absolute m-5 top-0 right-0 hover:bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="p-2 border border-gray-300 rounded mr-2 flex-grow"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
