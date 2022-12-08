import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "universal-cookie";

function LogOut() {
  const cookies = new Cookies();

  const handleClick = () => {
    console.log(cookies.get("isLoggedIn"));
    cookies.remove("isLoggedIn");
    window.location.reload();
    // axios
    //   .get("http://localhost:4000/logout")
    //   .then((response) => {
    //     // Use the response here
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     // Handle errors here
    //     console.log(error);
    //   });
  };
  return (
    <Button
      variant="contained"
      style={{ position: "absolute", right: "20px", marginLeft: "30px" }}
      onClick={() => handleClick()}
    >
      Sign Out
    </Button>
  );
}

export default LogOut;
