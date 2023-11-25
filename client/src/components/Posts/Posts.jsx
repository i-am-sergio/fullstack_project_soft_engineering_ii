import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  // const state = useSelector((state) => state);
  // console.log("Estado completo de postReducer:", state.postReducer);
  // let loading = false;
  
  useEffect(() => {
    if (user) {
      console.log(" se ejecuta dispatch");
      console.log("idddddddddddd => ",user.id);
      dispatch(getTimelinePosts(user.id));
    }
  }, [user]);
  
  if(!posts) return 'No Posts';
  if(params.id) {
    console.log("SE EJECUTO EL IF")
    posts = posts.filter((post)=> post.userId===params.id)
  } else {
    console.log("SE EJECUTO EL ELSE")
    posts = posts.data;
  }
  return (
    <div className="Posts">
    {loading
      ? "Fetching posts...."
      : posts.map((post) => {
          return <Post data={post} key={post.id} />;
        })}
    </div>
  );
};

export default Posts;
