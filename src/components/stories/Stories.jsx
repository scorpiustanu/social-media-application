import { useContext, useEffect, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Stories = () => {

    const { currentUser } = useContext(AuthContext)

    //TEMPORARY
    const [stories,setStories] = useState([
        {
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
    ]);

    // let [stories,setStories] = new useState([]);
    let [file,setFile] = new useState(null);



    let saveImg = async( file ) => {
        try {
            let formdata = new FormData();
            formdata.append('file',file);
            let response = await axios.post("http://localhost:8080/api/v1/upload/",formdata);
            // console.log();
            setStories((prev) => [...prev,{img : response.data.url}]);
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    const handleChange = (e) => {
        console.log("handleChange");
        // setFile(e.target.files[0]);

        if(e.target.files[0]){
            saveImg(e.target.files[0]);
        }
        
    }
   
    return (
        <div className="stories">
            <div className="story" style={{position:"relative"}}>
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                
                <input type="file" id="image" style={{display:"none"}} onChange={handleChange}  />
                <label htmlFor="image">
                <AddCircleIcon   sx={{position:"relative",margin:"-85px",top:"6px",width:"33px",height:"33px",color:"white"}}  />
                </label>
                
            </div>
            {stories.map((story,index ) => (
                <div className="story" key={index}>
                    <img src={story.img} alt="" />
                    {/* <span>{story.name}</span> */}
                </div>
            ))}
        </div>
    )
}

export default Stories