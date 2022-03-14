import React from "react";
import gql from "gql";

const Home = () => {
  return <div>Home</div>;
};

const FETCH_POSTS_QUERY = gql`
    getPosts{
        id
    }
}`;
export default Home;
