import api from "./axios";

export const requestOtp = (phone) =>
  api.post("/auth/otp/request", {
    phone,
    channel: "sms"
  });

export const verifyOtpApi = (otp_session_id, otp) =>
  api.post("/auth/otp/verify", {
    otp_session_id,
    otp,
    device_info: "web_app"
  });
