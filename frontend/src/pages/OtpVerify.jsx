import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifyOtpApi } from "../api/auth.api.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function OtpVerify() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { otp_session_id, phone } = state || {};

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!otp_session_id) {
    navigate("/login");
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtpApi(otp_session_id, otp);

      localStorage.setItem("token", res.data.access_token);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">

        <button className="mb-4" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </button>

        <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
        <p className="text-gray-600 mb-6">
          OTP sent to <span className="font-semibold">+91 {phone}</span>
        </p>

        <input
          type="number"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-3 rounded mb-4 tracking-widest text-center text-xl"
        />

        <button
          onClick={handleVerifyOtp}
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
