import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreatePost from "../components/Home/CreatePost";
import ModalCreatePost from "../components/Home/ModalCreatePost";
import { PostsGrid } from "../components/Posts/PostsGrid";
import usePostsStore from "../context/posts/posts-store";
import LayouteMain from "../layout/LayouteMain";
import usePostsFeedStore from "../context/posts/posts-feed-store";

const HomePage = () => {
  const {
    posts,
    page,
    hasMore,
    loading: isLoading,
    fetchPosts,
  } = usePostsFeedStore();

  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <LayouteMain>
      <section className="h-full w-full flex flex-col gap-y-5">
        <CreatePost />
        <article>
          <PostsGrid
            posts={posts}
            page={page}
            isLoading={loading}
            fetchPosts={fetchPosts}
            hasMore={hasMore}
            isTwoColumns={false}
          />
        </article>
      </section>
      <Routes>
        <Route path="/createpost" element={<ModalCreatePost />} />
      </Routes>
    </LayouteMain>
  );
};

export default HomePage;
