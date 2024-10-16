import { useEffect, useState } from "react";
import usePostsStore from "../../context/posts/posts-store";
import { PostsGrid } from "../Posts/PostsGrid";

export const ExplorePage = () => {
  const { posts, page, hasMore, isLoading, fetchPosts } = usePostsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (

    <div className="container mx-auto p-2 sm:p-0">
      <h2>ExplorePage</h2>

      <h2>Search </h2>
      <PostsGrid
        posts={posts}
        page={page}
        isLoading={loading}
        fetchPosts={fetchPosts}
        hasMore={hasMore}
        isTwoColumns={true}
      />
    </div>
  );
};
