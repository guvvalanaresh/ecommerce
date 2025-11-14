import { useState } from "react";
import { requestOtp } from "../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      alert("Enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      const res = await requestOtp(`+91${phone}`);

      navigate("/otp", {
        state: {
          otp_session_id: res.data.otp_session_id,
          phone: phone,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
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

        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p className="text-gray-600 mb-6">
          Enter your phone number to receive an OTP.
        </p>

        <input
          type="number"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}
