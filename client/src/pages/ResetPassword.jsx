import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function checkRecoverySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setHasSession(!!session);
        setCheckingSession(false);
      }
    }

    checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setHasSession(true);
        setCheckingSession(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleResetPassword() {
    if (!password || !confirmPassword) {
      alert("Please enter both password fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("Reset link is invalid or expired. Please request a new reset link.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      alert("Password changed successfully!");

      await supabase.auth.signOut();

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white">Verifying reset link...</p>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-3">
            Invalid or Expired Link
          </h1>

          <p className="text-slate-400 mb-6">
            This password reset link is invalid or has expired.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-semibold"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-2">
          Reset Password
        </h1>

        <p className="text-slate-400 mb-6">
          Enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-slate-800 text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded bg-slate-800 text-white mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-3 rounded text-white font-semibold transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;