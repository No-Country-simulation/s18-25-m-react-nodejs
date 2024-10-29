import { useEffect, useState } from "react";
import usePostsStore from "../../context/posts/posts-store";
import { PostsGrid } from "../Posts/PostsGrid";
import { Search } from "./Search";
import usePostsFeedStore from "../../context/posts/posts-feed-store";

export const ExplorePage = () => {
  const {
    posts,
    page,
    hasMore,
    loading: isLoading,
    fetchPosts,
  } = usePostsFeedStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="container mx-auto p-2 sm:p-0 mb-6">
      <Search />
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
