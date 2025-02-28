import React, { useState, useRef, useContext } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
  CircularProgress,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const navigate = useNavigate();

  const [verifing, setVerfing] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { genOTP, setOTP } = useContext(ThemeContext);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    let enterValue = JSON.parse(otp.join(""));
    let dbid = JSON.parse(sessionStorage.getItem("db-id"));

    if (genOTP === enterValue) {
      setVerfing(true);
      setTimeout(() => {
        navigate("/");
        localStorage.setItem("db-id", JSON.stringify(dbid));
      }, 3000);
    } else {
      console.log("login Failed");
      setVerfing(true);
      setTimeout(() => {
        setVerfing(false);
        alert("Worng OTP , Try Again");
        navigate("/auth");
      }, 3000);
    }
    // console.log("Entered OTP:", JSON.parse(otp.join("")));
  };

  return (
    <div style={styles.container}>
      {!verifing ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card sx={styles.card}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#d83600" }}
            >
              OTP Verification
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", marginBottom: 2 }}>
              Enter the 6-digit OTP sent to your whatsapp.
            </Typography>

            <Box sx={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  variant="outlined"
                  sx={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "20px",
                      color: "#ff5c00",
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={styles.button}
              onClick={handleVerify}
            >
              Verify OTP
            </Button>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card elevation={0}>
            <CardContent>
              <CircularProgress color="info" />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #ff8c00, #d83600)",
  },
  card: {
    padding: "30px",
    width: "350px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
  },
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  otpInput: {
    width: "45px",
    height: "50px",
  },
  button: {
    background: "#d83600",
    "&:hover": { background: "#b02e00" },
  },
};

export default OTPVerification;
