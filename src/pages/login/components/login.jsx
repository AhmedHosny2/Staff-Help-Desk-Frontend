import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { customFetch } from "../../../utils/Fetch";
import { getToastStyle, removeToast } from "../../../utils/toastStyle";
import toast, { Toaster } from "react-hot-toast";
import GoogleButton from "./googleButton";
// chat stuff for local storage
import { useAuthContext } from "../../chat/context/AuthContext.jsx";
import { useSocketContext } from "../../chat/context/SocketContext.jsx";

export default function LoginComponent() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingin, setLoggingin] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [message, setMessage] = useState("");
  //chat
  const { setUser, setToken } = useAuthContext();
  const { socketConnect } = useSocketContext();

  const handleLoginClick = async () => {
    setLoggingin(true);

    const body = {
      email,
      password,
    };

    const { err, isPen, newData, newStatus, newStatusText, newMessage } =
      await customFetch(
        process.env.REACT_APP_USERS_URL + "login",
        "POST",
        body
      );

    setError(err);
    setIsPending(isPen);
    setData(newData);
    setStatus(newStatus);
    setStatusText(newStatusText);
    setMessage(newMessage);
    if (newStatusText === "success") {
      localStorage.setItem("role", newData.role);
      localStorage.setItem("loggedin", true);
      console.log(newData.role);
      if (newData.role.startsWith("agent")) {
        var role = newData.role.slice(0, -1);
      } else {
        role = newData.role;
      }
      var toastId = toast.success("Successfully Logged In", getToastStyle());
      setTimeout(() => {
        navigate("/home/" + role);
        setLoggingin(false);
      }, 2500);
    } else if (newStatusText === "MFA required") {
      localStorage.setItem("MFA",true)
      toastId = toast.error("MFA check", getToastStyle());
      console.log("MFA check");
      setTimeout(() => {
        navigate("/mfa/validate");
        setLoggingin(false);
      }, 2500);
    } else {
      toastId = toast.error(newMessage, getToastStyle());
      setLoggingin(false);
    }
    removeToast(toast, toastId);

    //fetch the user data for chat
    // DO THIS
    /*  postLogin(
      {
        method: 'POST',
        url: authAPI.login,
        data: { ...formData }
      },
      (data) => {
        const { accessToken, ...other } = data.data;
        setUser({ ...other });
        setToken({ accessToken });
        socketConnect();
      }
    );*/
    fetch(process.env.REACT_APP_USERS_URL + "getUserDataForChat", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then((data) => {
		const { accessToken, ...other } = data.data;
        setUser({ ...other });
        setToken({ accessToken });
        socketConnect();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Welcome Back!</h1>
            <p className="py-6">
              To keep connected with us, please log in with your personal info.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-3xl shadow-2xl">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder=". . ."
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <Link href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={handleLoginClick}
                  disabled={loggingin}
                >
                  {loggingin ? (
                    <>
                      Logging In
                      <span className="loading loading-spinner loading-xs"></span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                <label className="">
                  <Link to="/signup" className="label-text-alt link link-hover">
                    New here? Sign up now
                  </Link>
                </label>
              </div>
              <div className="divider">OR</div>
              <div className="grid place-items-center">
                <GoogleButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
