import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { makeRequest } from "../../axios";
import { useQueryClient,useMutation,useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Update from "../../components/update/update";
import {useState , useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

    // const userId = useLocation().pathname.split('/')[2];

    // const {isLoading,error,data} = useQuery(['user'] , async () => {
    //     let res = await makeRequest.get(`/user/${userId}`);
        
    //     return res.data;
    // });

    let defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";


    const [openUpdate, setOpenUpdate] = useState(false);
    const { currentUser } = useContext(AuthContext);
  
    // console.log(useLocation().pathname.split('/')[1],useLocation().pathname.split('/')[2]);
    const userId = useLocation().pathname.split("/")[2].toString();
    console.log(userId);
  
    const { isLoading, error, data } = useQuery(["user"], () =>
      makeRequest.get(`/user/${userId}`).then((res) => {
        return res.data;
      })
    );
  
    const { isLoading: rIsLoading, data: relationshipData } = useQuery(
      ["relationship"],
      () =>
        makeRequest.get(`/relationship/${userId}/follow`).then((res) => {
            console.log(res.data);
          return res.data;
        })
    );

    console.log(relationshipData);
  
    const queryClient = useQueryClient();
  
    const mutation = useMutation(
      (following) => {
        if (following)
          return makeRequest.get(`/relationship/${userId}/unfollow`);
        return makeRequest.get(`/relationship/${userId}/follow`);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["relationship"]);
        },
      }
    );
  
    const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id));
    };


    return (
        <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={ data?.coverPic ? data?.coverPic : defaultImg } alt="image" className="cover" />
            <img src={ data?.profilePic ? data?.profilePic : defaultImg } alt="image" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                {/* <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a> */}
              </div>
              <div className="center">
                <span>{data?.name}</span>
                <div className="info">
                  {/* <div className="item">
                    <span style={{fontSize:"17px"}}>{data?.username}</span>
                  </div> */}
                  
                </div>
                <div className="item">
                    <span style={{fontSize:"15px"}}>{data?.about}</span>
                  </div>
                
              </div>
              <div className="right">
              {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.id ? (
                  <button style={{background:"black",padding:"10px",border:"none",color:"white",borderRadius : "20px"}} onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button style={{background:"black",padding:"10px",border:"none",color:"white",borderRadius : "20px"}} onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
    );
};

export default Profile;