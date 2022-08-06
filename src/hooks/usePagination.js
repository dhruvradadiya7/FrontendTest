export const DOTS = "...";

function usePagination({ currentPage, totalCount, pageSize }) {
  /*
   comments
  */
 
  const pages = Math.ceil(totalCount / pageSize);
  if (pages < 5) {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }
  if (currentPage <= 2) {
    return [1, 2, 3, DOTS, pages];
  } else if (currentPage > 2 && pages - 2 >= currentPage) {
    return [
      1,
      DOTS,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      DOTS,
      pages,
    ];
  } else {
    return [
      1,
      DOTS,
      Math.ceil(totalCount / pageSize) - 2,
      Math.ceil(totalCount / pageSize) - 1,
      pages,
    ];
  }
}

export default usePagination;
