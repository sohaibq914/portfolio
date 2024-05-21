"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiArrowLeftThin } from "react-icons/pi";
import { motion } from "framer-motion";
import Image from "next/image";
import blogsData from "@/contents/blogs.json";
import { useParams } from "next/navigation";

function BlogPage() {
  const params = useParams();
  const { id: slug } = params;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (slug) {
      const blogData = blogsData.find((b) => b.slug === slug);
      setBlog(blogData);
    }
  }, [slug]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="text-neutral-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: 0.9,
          type: "spring",
          stiffness: 200,
        },
      }}
    >
      <div className="sticky top-5">
        <div className="-mt-6">
          <div className="bg-neutral-700/25 backdrop-blur-md h-10 w-full rounded-xl flex items-center gap-x-7">
            <Link href={"/dashboard"}>
              <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center ml-3">
                <div className="bg-neutral-300 rounded-full h-5 w-5 flex items-center justify-center">
                  <PiArrowLeftThin className="text-black text-lg" />
                </div>
              </div>
            </Link>

            <Link href={"/"}>
              <button className="text-xs bg-neutral-700/25 p-1 w-16 h-6 rounded-md">Home</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-9 w-full p-5 border border-neutral-700 rounded-2xl h-full bg-[#1C1C1C]">
        <motion.h1
          initial={{ x: 100, opacity: 0, filter: "blur(4px)" }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.8,
              delay: 0.9,
              type: "spring",
              stiffness: 200,
            },
          }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-RubikExtraBold text-center"
        >
          {blog.title}
        </motion.h1>
        <div className="flex items-center gap-x-2 justify-center my-4 font-RubikRegular">
          <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[10px]">{blog.date}</p>
        </div>

        {blog.featuredImage && (
          <div className="my-11 font-RubikMedium">
            <Image width={1000} height={1000} className="rounded-lg h-56 w-full object-cover" src={blog.featuredImage} alt="" />
          </div>
        )}

        {blog.featuredParagraph.map((paragraph, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}

        {blog.contents.map((content, index) => (
          <div key={index} className="my-9">
            <h2 className="text-2xl font-RubikExtraBold">{content.title}</h2>
            {content.image && (
              <div className="my-9">
                <Image height={1000} width={1000} className="rounded-lg h-56 w-full object-cover" src={content.image} alt="" />
              </div>
            )}
            {content.para.map((paragraph, paraIndex) => (
              <p key={paraIndex} className="my-4" dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default BlogPage;
