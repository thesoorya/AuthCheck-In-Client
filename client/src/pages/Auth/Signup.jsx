import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
import { StoreContext } from "../../context/Store";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { signUp } = useContext(StoreContext);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(signupData);
    // navigate("/home");
  };

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          Welcome,
          <br />
          <span>Sign up to continue</span>
        </div>
        <input
          className="input"
          name="username"
          placeholder="Username"
          type="text"
          value={signupData.username}
          onChange={handleChange}
        />
        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          value={signupData.email}
          onChange={handleChange}
        />
        <input
          className="input"
          name="password"
          placeholder="Password"
          type="password"
          value={signupData.password}
          onChange={handleChange}
        />
        <button className="button-confirm" type="submit">
          Sign up
        </button>
        <div className="router-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
