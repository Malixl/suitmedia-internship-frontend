// src/pages/Ideas.jsx
import React from "react";
import Banner from "../components/Banner";
import PostList from "../components/PostList";

const Ideas = () => {
  return (
    <div>
      <Banner
        imageUrl="/public/header/image3.png"
        title="Ideas"
        subtitle="Where all our great things begin"
      />
      <div className="max-w-7xl mx-auto p-4">
        <PostList />
      </div>
    </div>
  );
};

export default Ideas;
