import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("rishav@gmail.com");
  const [password, setPassword] = useState("Rishav@123");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:7777/login", {
        email,
        password,
      }, {withCredentials: true});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
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
              type="text"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center m-3">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
