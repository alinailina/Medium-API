import React, { useState, useEffect } from "react";
import Post from "./Post";

const Posts = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@uxplanet"
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setPosts(data.items);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </ul>
    );
  }
};

export default Posts;
