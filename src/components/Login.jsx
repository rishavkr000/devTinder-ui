import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      const register = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(register.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <div className="flex justify-between">
                <fieldset className="fieldset w-38">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset w-38 mr-4">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              value={email}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-3">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleRegister}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div>
            <h5 className="text-center">
              {isLoginForm
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                {isLoginForm ? "Register Now" : "Login"}
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
