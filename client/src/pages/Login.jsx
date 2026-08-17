import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    navigate("/admin");
  }

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    try {
      setResetting(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          "https://shyamganesh242007-lang.github.io/shyam-studio/reset-password",
      });

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      alert(
        "Password reset link has been sent to your email. Please check your inbox."
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-6">
          Admin Login
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-slate-800 text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-slate-800 text-white mb-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Forgot Password */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={resetting}
            className="text-sm text-blue-400 hover:text-blue-300 transition"
          >
            {resetting ? "Sending..." : "Forgot Password?"}
          </button>
        </div>

        {/* Login */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-semibold transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;