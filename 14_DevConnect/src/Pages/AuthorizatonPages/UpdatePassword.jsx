import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState("password");
  const [hideConfirmPassword, setHideConfirmPassword] = useState("password");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  const handleUpdatePassword = async () => {
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    await supabase.auth.signOut();

    setSuccess(true);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-100">
        <h2 className="text-2xl font-bold mb-2">Update Password</h2>

        <p className="text-sm text-gray-600 mb-6">
          Enter your new password below.
        </p>

        <div className="flex flex-col gap-4">
          {/* New Password */}
          <div>
            <label className="text-sm font-semibold">New Password</label>

            <div className="flex border-2 border-gray-300 rounded-md mt-1">
              <input
                type={hidePassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-2 outline-none"
                placeholder="Enter new password"
              />

              <button
                type="button"
                className="px-2"
                onClick={() =>
                  setHidePassword(
                    hidePassword === "password" ? "text" : "password",
                  )
                }
              >
                {hidePassword === "password" ? "Show" : "Hide"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold">Confirm Password</label>

            <div className="flex border-2 border-gray-300 rounded-md mt-1">
              <input
                type={hideConfirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-2 py-2 outline-none"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                className="px-2"
                onClick={() =>
                  setHideConfirmPassword(
                    hideConfirmPassword === "password" ? "text" : "password",
                  )
                }
              >
                {hideConfirmPassword === "password" ? "Show" : "Hide"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Success */}
          {success && (
            <p className="text-sm text-green-600">
              Password updated successfully. Redirecting...
            </p>
          )}

          <button
            onClick={handleUpdatePassword}
            className="bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
