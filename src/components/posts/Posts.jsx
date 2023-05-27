import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {

    const {isLoading , error , data } = useQuery(['/posts/all'], async() => {
        let res=  await makeRequest.get("/posts/all");
        console.log(res);
        return res.data;
    })
    

    console.log(error);
    console.log("data : " + data);
   
    return <div className="posts">
        { 
            error ? "Errro" : isLoading ? "Loading...." :  data.map(post => (
                <Post post={post} key={post.id} />
            ))
             
        }
    </div>;
};

export default Posts;