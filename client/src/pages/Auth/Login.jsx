import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
import { StoreContext } from "../../context/Store";
import { toast } from "react-hot-toast";

const Login = () => {
    const { login } = useContext(StoreContext);
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(loginData);
        // navigate("/home");
    };

    return (
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <div className="title">
                    Welcome,
                    <br />
                    <span>Sign in to continue</span>
                </div>
                <input
                    className="input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={loginData.email}
                    onChange={handleChange}
                />
                <input
                    className="input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                />
                <button className="button-confirm" type="submit">
                    Login
                </button>
                <div className="router-link">
                    New user? <Link to="/signup">Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
