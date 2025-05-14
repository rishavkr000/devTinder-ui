import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("")
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
      console.log(register);
      navigate("/login");
    } catch (err) {
        setError(err.response.data.message)
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>
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
            <button className="btn btn-primary" onClick={handleRegister}>
              Sign Up
            </button>
          </div>
          <div>
            <h5 className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                {" "}
                Login
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
