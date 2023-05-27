import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation } from "react-router-dom";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name,
    about : user.about
  });

  const userId = useLocation().pathname.split("/")[2];

  let defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";


  const upload = async (file) => {
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      // url
      const res = await makeRequest.post("/upload/", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    ;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      console.log(user);
      return makeRequest.put("/user/update", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user?.coverPic;
    profileUrl = profile ? await upload(profile) : user?.profilePic;

    if(coverUrl && profileUrl){
      mutation.mutate({ about : texts.about,name : texts.name, coverPic: coverUrl.url, profilePic: profileUrl.url,userId });
    }
    
    setCover(null);
    setProfile(null);
  }

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : defaultImg
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      :defaultImg
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={(e) =>setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value}))}
          />
          <label>About</label>
          <input
            type="text"
            name="about"
            value={texts.about}
            onChange={(e) =>setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value}))}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update