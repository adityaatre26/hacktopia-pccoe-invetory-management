import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    prnNum: "",
    password: "",
    designation: "Student",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ userData }),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      console.log("Token stored in localStorage:", data.token);
      alert(data.message);
      navigate("/create-event");
    } else {
      // Handle errors
      alert(data.message);
    }
  };

  return (
    <div className="register">
      <form action="/register" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="prnNum">PRN Number</label>
        <input
          type="text"
          id="prnNum"
          name="prnNum"
          value={userData.prnNum}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="designation">Designation</label>
        <select
          id="designation"
          name="designation"
          value={userData.designation}
          onChange={handleInputChange}
          required
        >
          <option value="Student">Student</option>
          <option value="Staff">Staff</option>
        </select>

        <button>Register</button>
      </form>
    </div>
  );
}
