import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);

    let { currentUser } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem("user"));


    // const {isLoading,error,data} = useQuery(['liked'] , async () => {
    //     let data = await makeRequest.get(`/posts/${post._id}`);
    //     console.log(data)
    //     return data?.data?.userId;
    // });

    const queryClient = useQueryClient();
    // const mutation = useMutation((liked) => {
    //     console.log(liked);
    //     if(liked) return makeRequest.post("/dislike",{
    //         postId : post._id
    //     });
    //     return makeRequest.post("/like",{
    //         postId : post._id
    //     })
    // },
    // {
    //     onSuccess :  () => {
    //         queryClient.invalidateQueries(['liked']);
    //     }
    // }
    
    // );


    const unLikeMutation = useMutation(async(postId) => {
        return await makeRequest.post("/like",{
            postId
        })
    },{
        onSuccess : () => {
            queryClient.invalidateQueries(['/posts/all'])
        }
    })

    // const deleteMutation = useMutation((postId) => {
    //     return makeRequest.delete("/posts/delete",{
    //         postId : post._id
    //     });
    // },{
    //     onSuccess : () => {
    //         queryClient.invalidateQueries(['/posts/all'])
    //     }
    // });


    const handleLike = () => {
        console.log("called");

        // console.log(data);
        // console.log(currentUser);

        unLikeMutation.mutate(post._id);

        // mutation.mutate(data.includes(user.id));
    }

    // const handleDelete = () => {
    //     deleteMutation.mutate(post._id);
    // }

    // console.log(data);
    // console.log(post + " " + data)

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={user.profilePic} alt="" />
                        <div className="details">
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <span className="name" style={{color:"indigo"}}>{user.name}</span>
                            </Link>
                            <span className="date" style={{color:"indigo"}}>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post?.url} alt="" />
                </div>
                <div className="info">
                    <div className="item" style={{color:"black"}}>
                        {
                            ( post?.like?.includes(user.id) )  ? 
                         <FavoriteOutlinedIcon style={{color: "red"}} onClick={handleLike}  /> : <FavoriteBorderOutlinedIcon style={{color:"black"}} onClick={handleLike} />}
                         {post?.like?.length} Likes
                    </div>
                    <div className="item" style={{color:"black"}} onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        See Comments
                    </div>
                    {/* <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div> */}
                </div>
                {commentOpen && <Comments postId={post._id} />}
            </div>
        </div>
    );
};

export default Post;