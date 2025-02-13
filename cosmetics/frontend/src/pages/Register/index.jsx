import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // API URL'sini merkezi hale getirdik

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Kayıt başarısız:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Kayıt başarısız, tekrar deneyin.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
