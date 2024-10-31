import { useEffect, useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PostCard } from "./PostCard";

export const PostsGrid = ({
  posts,
  page,
  isLoading,
  fetchPosts,
  hasMore,
  isTwoColumns,
}) => {
  const observer = useRef();
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 770px)");

    const handleResize = () => {
      setIsSmall(!mediaQuery.matches);
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page, fetchPosts]
  );

  useEffect(() => {
    fetchPosts(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div
      className="w-full"
      style={{
        columnCount: isSmall ? 1 : isTwoColumns ? 2 : 1,
        columnGap: "1rem",
      }}
    >
      {posts.map((post, index) => {
        const isLastPost = index === posts.length - 1;
        return (
          <div
            ref={isLastPost ? lastPostElementRef : null}
            key={`${post.id}-${page}`}
            className="mb-4 break-inside-avoid"
          >
            <PostCard post={post} />
          </div>
        );
      })}

      {isLoading && (
        <div className="w-full space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col p-4 bg-secondBlack-700 border border-neutral-700 rounded-md shadow-md"
            >
              <div className="h-8 bg-neutral-700 animate-pulse rounded-md mb-2 w-1/2" />
              <div className="h-4 bg-neutral-700 animate-pulse rounded-md mb-2 w-full" />
              <div className="h-4 bg-neutral-700 animate-pulse rounded-md mb-2 w-5/6" />
              <div className="h-4 bg-neutral-700 animate-pulse rounded-md w-4/5 mb-4" />
              <div className="h-32 bg-neutral-700 animate-pulse rounded-md mb-4" />
            </div>
          ))}
        </div>
      )}

      {!hasMore && !isLoading && (
        <p className="col-span-full text-center text-gray-500">
          No hay más publicaciones.
        </p>
      )}
    </div>
  );
};

// PropTypes
PostsGrid.propTypes = {
  posts: PropTypes.array,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  fetchPosts: PropTypes.func,
  hasMore: PropTypes.bool,
  isTwoColumns: PropTypes.bool,
};
