import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

    
    const user = JSON.parse(localStorage.getItem("user"));
console.log("userId : "  + user);
    return (
        <div className="navbar">
            <div className="navbarleft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Social Media</span>
                </Link>
                
                {/* <HomeOutlinedIcon /> */}
                {/* {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggle} />
                ) : (
                    <DarkModeOutlinedIcon onClick={toggle} />
                )} */}
                {/* <GridViewOutlinedIcon /> */}
                {/* <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div> */}
            </div>
            <div className="right">
                {/* <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon /> */}
                <Link to={`/profile/${user?.id}`} style={{textDecoration:"none"}}>
                <div className="user">
                    <img
                        src={currentUser.profilePic}
                        alt=""
                    />
                    <span style={{color:"#0000cc"}}>{currentUser.name}</span>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;