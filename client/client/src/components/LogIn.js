import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import axios from "axios";

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  borderColor: "text.primary",
  margin: "100px auto",
  padding: "50px",
  display: "flex",
  justifyContent: "left",
  border: 1,
  zIndex: 1,
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  width: "fit-content",
};

function LogIn() {
  const handleClick = () => {
    axios
      .get("http://localhost:4000/loginRedirect")
      .then((response) => {
        // Use the response here
        console.log(response);
      })
      .catch((error) => {
        // Handle errors here
        console.log(error);
      });
  };
  return (
    <div className="logIn">
      <Box sx={{ ...commonStyles }}>
        <Icon icon="mdi:spotify" width="100" color="green" />
        <a href="http://localhost:4000/login">
          <Button variant="contained" style={{ marginLeft: "30px" }}>
            Sign In
          </Button>
        </a>
      </Box>
    </div>
  );
}

export default LogIn;
