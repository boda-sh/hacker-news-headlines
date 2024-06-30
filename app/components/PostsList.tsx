"use client";

import { useEffect, useState } from "react";
import { HNPost } from "../lib/types";
import { BackToTop } from "./BackToTop";

export const PostItem = ({ post }: { post: HNPost }) => {
  return (
    <tr className="postItem odd:bg-slate-50 even:bg-slate-100 dark:odd:bg-[#09090b] dark:even:bg-[#27272a] dark:text-[#a1a1aa]">
      <td className="p-1 sm:p-2 text-right whitespace-nowrap">{post.scores}</td>

      <td className="p-1 sm:p-2 text-left text-gray-700 dark:text-[#fafafa]">
        <a href={post.link} target="_blank" rel="nofollow" className="hover:underline decoration-1">
          {post.title}
        </a>
      </td>

      <td className="p-1 sm:p-2 whitespace-nowrap text-right">
        <a
          className="hover:underline decoration-1"
          href={`https://news.ycombinator.com/item?id=${post.id}`}
          target="_blank"
        >
          {post.date}
        </a>
      </td>
    </tr>
  );
};

export const PostsList = () => {
  const [posts, setPosts] = useState<HNPost[]>([]);

  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, []);

  if (!posts.length) return null;

  return (
    <div>
      <table className="text-sm md:text-base text-gray-400 w-full table-fixed mt-3">
        <thead>
          <tr className="leading-6">
            <th className="w-10 sm:w-12 opacity-50 whitespace-nowrap p-2 border-b dark:border-slate-600 text-right">
              ☕
            </th>
            <th className="p-2 border-b dark:border-slate-600 text-center">Title</th>
            <th className="w-16 sm:w-20 p-2 pr-4 opacity-50 whitespace-nowrap border-b dark:border-slate-600 text-right">
              💬
            </th>
          </tr>
        </thead>

        <tbody id="postList" className="">
          {posts.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })}
        </tbody>
      </table>

      <BackToTop />
    </div>
  );
};
