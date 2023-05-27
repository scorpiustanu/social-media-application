import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({postId}) => {
    const { currentUser } = useContext(AuthContext);
    let defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";


    const queryClient = useQueryClient();

    let [inputComment,setInputComment] = useState("");
    

    const {isLoading,error,data} = useQuery([`/comments/${postId}/all`],async () => {
       let data = await makeRequest.get(`/comments/${postId}/all`);
       return data.data[0].comments;
    });

    const mutation = useMutation((newcomment) => {
        console.log(newcomment);
        return makeRequest.post("/comments/add",newcomment);
    },

    {
        onSuccess : () => {
            queryClient.invalidateQueries([`/comments/${postId}/all`])
        }
    }
    );


    const handleComment = (e) => {
        e.preventDefault();

        mutation.mutate({
            content : inputComment,
            postId
        });

        setInputComment("");

    }

    return (
        <div className="comments" style={{color:"black"}}>
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input style={{color:"black"}} type="text" placeholder="write a comment" onChange={(e) => setInputComment(e.target.value)} value={inputComment} />
                <button onClick={handleComment}>Send</button>
            </div>
            { isLoading ? "Loading..." : data && data.map((comment) => (
                <div className="comment">
                    <img src={defaultImg} alt="" />
                    <div className="info">
                        {/* <span>{comment.name}</span> */}
                        <p style={{color:"black"}}>{comment.content}</p>
                    </div>
                    <span className="date">{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    );
};

export default Comments;