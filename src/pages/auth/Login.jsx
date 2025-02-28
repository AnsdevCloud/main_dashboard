import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  LinearProgress,
  Stack,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../firebase/config";
import { ThemeContext } from "../../theme/ThemeContext";
import axios from "axios";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaLess } from "react-icons/fa";

const Login = () => {
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setOTP } = useContext(ThemeContext); // using only setOTP here
  const [loading, setLoading] = useState(false);

  // Function to generate a 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleLogin = () => {
    setLoading(true);
    setError(null);

    signInWithEmailAndPassword(authentication, email, password)
      .then((c) => {
        let user = c.user;
        handleGetUser(user?.uid);
        sessionStorage.setItem("db-id", JSON.stringify(user?.uid));
      })
      .catch((error) => {
        const errorCode = error.code;
        const msgArr = errorCode?.split("/");
        const msg = msgArr[1]?.split("-").join(" ");
        setLoading(false);
        setError(msg);
      });
  };

  const handleGetUser = (uid) => {
    // Generate OTP and update context
    const otpGenerated = generateOTP();
    setOTP(otpGenerated);

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://db.enivesh.com/firestore/single/offiece_team/${uid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // Pass the generated OTP to the send function
        handleOPTSend(result, otpGenerated);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleOPTSend = (user, otpGenerated) => {
    const options = {
      method: "POST",
      url: "https://public.doubletick.io/whatsapp/message/template",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "key_2sjcXWa3Ti",
      },
      data: {
        messages: [
          {
            from: "+919833888817",
            to: `+91${user?.phoneNumber}`,
            messageId: v4(),
            content: {
              templateName: "login_otp",
              language: "en",
              templateData: {
                body: {
                  placeholders: [otpGenerated.toString()],
                },
                buttons: [
                  {
                    type: "URL",
                    parameter: otpGenerated.toString(),
                  },
                ],
              },
            },
          },
        ],
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setLoading(false);
        navigate("/auth/otp");
      })
      .catch(function (error) {
        console.error(error?.message);
        setLoading(false);
      });
  };

  return (
    <div style={styles.container}>
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
            Login to Your Account
          </Typography>

          <TextField
            fullWidth
            label="Email"
            sx={styles.input}
            slotProps={{
              input: {
                color: "#000",
              },
            }}
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            alignContent={"center"}
            gap={2}
            width={"100%"}
            height={60}
          >
            <TextField
              fullWidth
              label="Password"
              type={!isPassword ? "password" : "text"}
              size="small"
              sx={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <IconButton
              onMouseLeave={() => setIsPassword(false)}
              onClick={() => setIsPassword(!isPassword)}
            >
              {!isPassword ? <BsEye /> : <BsEyeSlash />}
            </IconButton>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={styles.button}
            onClick={handleLogin}
          >
            Login
          </Button>

          {!loading && (
            <Typography
              variant="caption"
              component="span"
              color="error"
              textTransform="capitalize"
            >
              {error}
            </Typography>
          )}
          {loading && <LinearProgress sx={{ mt: 1 }} color="info" />}
        </Card>
      </motion.div>
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
    // background: "#fff",
  },
  input: {
    marginTop: "15px",
  },
  button: {
    marginTop: "20px",
    background: "#d83600",
    "&:hover": { background: "#b02e00" },
  },
};

export default Login;
