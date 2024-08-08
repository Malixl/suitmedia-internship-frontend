import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import Pagination from "../utils/Pagination";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("-published_at");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://suitmedia-backend.suitdev.com/api/ideas",
          {
            params: {
              "page[number]": currentPage,
              "page[size]": pageSize,
              append: ["small_image", "medium_image"],
              sort: sortOrder,
            },
          }
        );
        setPosts(response.data.data);
        setTotalItems(response.data.meta.total);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, sortOrder]);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const meta = {
    last_page: Math.ceil(totalItems / pageSize),
  };

  return (
    <div className="container mx-auto p-4">
      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          Showing {(currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </div>
        <div className="flex items-center gap-3">
          {" "}
          Show Per Page:
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="mr-2 p-2 border rounded"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          Sort by: Sort by:
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 border rounded"
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        className="my-20 flex justify-center"
        page={currentPage}
        setPage={setCurrentPage}
        meta={meta}
      />
    </div>
  );
};

export default PostList;
