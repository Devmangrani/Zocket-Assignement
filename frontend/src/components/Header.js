import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all user data on logout
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(45deg, #4A90E2 30%, #F39C12 90%)",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "white",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Real-Time Task Management System
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutOutlined />}
            sx={{ color: "white" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Header;
