import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
// import {ProgressBar} from "react-bootstrap";
import ImageIcon from '@mui/icons-material/Image';
import {
    useMutation,
    useQueryClient
  } from '@tanstack/react-query'

const Share = () => {

    const queryClient = useQueryClient();

    const { currentUser } = useContext(AuthContext)

    const [file,setFile] = useState(null);
    const [desc,setDesc] = useState("");
    // const [progress,setProgress] = useState(null);
    let flag = false;

    const uploadfile = async () => {
        try {
            let formdata = new FormData();
            formdata.append('file',file);
            let data= await makeRequest.post("/upload/",formdata);
            console.log(data.data.url);
            
            return data.data.url;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    const mutation  = useMutation(
        (newPost) =>{
            if(flag == false)
                return;
            return makeRequest.post("/posts/save",newPost);
        },

        {
            onSuccess : () => {
                queryClient.invalidateQueries(["/posts/all"]);
            }
        }
    )

    const handleShare = async function(e){
        e.preventDefault();

        flag = true;
         
        let fileUrl = "";
        if(file)
            fileUrl = await uploadfile();
        console.log(fileUrl);
        
        mutation.mutate({desc , url : fileUrl});
        
        setDesc("");
        setFile(null);
  }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left" style={{borderRadius:"20px"}} >
                        <img
                            src={currentUser.profilePic}
                            alt="Profile picture"
                        />
                        <input type="text" style={{color:"black"}} placeholder={`What's on your mind ${currentUser.name}?`} onChange={(e) => setDesc(e.target.value)} value={desc} />
                    </div>
                    <div className="right">
                        {file && <img alt="" className="file" src={URL.createObjectURL(file)} />
                        
                        }
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left"  style={{borderRadius:"20px"}}>
                        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        <label htmlFor="file" className="item">
                            {/* <div className="item"> */}
                                <ImageIcon/>
                                <span>Add Image</span>
                            {/* </div> */}
                        </label>
                        {/* <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div> */}
                    </div>
                    <div className="right">
                        <button onClick={handleShare}>Share</button>
                    </div>
                </div>
                {/* {progress && <ProgressBar now={progress} label={`${progress}%`} /> } */}
            </div>
        </div>
    );
};

export default Share;