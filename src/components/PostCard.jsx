import React, { useState } from "react";
import { dateFormatter } from "../utils/DateFormatter";

const PostCard = ({ post }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  // Define base URL for images
  const baseURL = "https://suitmedia-backend.suitdev.com/api/ideas";

  // Construct the image URL
  const imageUrl = post.medium_image
    ? `${baseURL}${post.medium_image}`
    : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={handleError}
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-red-500">
            Gagal memuat gambar
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm text-gray-600 mt-2">
          {dateFormatter(post.published_at)}
        </p>
        <h3 className="text-lg font-bold text-gray-900 h-16 overflow-hidden overflow-ellipsis">
          {post.title}
        </h3>
      </div>
    </div>
  );
};

export default PostCard;
