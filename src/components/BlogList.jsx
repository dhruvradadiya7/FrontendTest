import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import blogs from "../data/blogs.json";
import { useState } from "react";
import { useEffect } from "react";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [currentPaginationData, setCurrentPaginationData] = useState(
    blogs.posts.slice(0, 15)
  );

  const updateRowsPerPage = (val) => {
    setPageSize(parseInt(val));
  };
  const updatePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(
    () =>
      setCurrentPaginationData(
        blogs.posts.slice((currentPage - 1) * pageSize, pageSize * currentPage)
      ),
    [pageSize, currentPage]
  );

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
