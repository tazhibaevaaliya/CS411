import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "universal-cookie";

function LogOut() {
  const cookies = new Cookies();

  const handleClick = () => {
    const id = cookies.get("userInformation").id;
    // const options = {
    //   method: "GET",
    //   url: "http://localhost:4000/logout",
    //   params: { id: id },
    // };
    // axios
    //   .request(options)
    //   .then((response) => {
    //     // Use the response here
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     // Handle errors here
    //     console.log(error);
    //   });

    console.log(cookies.get("isLoggedIn"));
    cookies.remove("isLoggedIn");
    cookies.remove("spotify_auth_state");
    cookies.remove("userInformation");
    window.location.reload();
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
