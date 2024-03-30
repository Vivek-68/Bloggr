import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../auth/Auth";

const LoginPage = () => {
  const { setUserinfo } = useContext(UserContext);
  const {setUser} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      
      if (response.ok) {
        response = await response.json();
        setUser(response.username);
        setUserinfo({ id: response._id, username: response.username });
        setRedirect(true);
      } else {
        alert("Wrong credentials!");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  if (redirect) {
    return navigate(from, {replace:true});
  }

  return (
    <div className="m-4 my-8">
      <form
        className="sm-w-[50%] m-auto flex flex-col gap-2 rounded-md border-2 border-gray-200 p-6 font-poppins lg:w-[40%]"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-xl font-semibold sm:text-2xl">
          Login to your account
        </h2>
        <p>Email</p>
        <input
          className="rounded-md border-2 border-gray-200 p-2"
          type="email"
          placeholder="m@example.com"
          name="email"
          onChange={handleChange}
        />
        <p>Password</p>
        <input
          className="rounded-md border-2 border-gray-200 p-2"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <button
          className="mt-6 rounded-md border-2 border-black p-1.5 hover:bg-black hover:text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
