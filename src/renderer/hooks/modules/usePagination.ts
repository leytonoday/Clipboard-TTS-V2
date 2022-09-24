import { useMemo } from 'react';

interface usePaginationProps {
  totalPages: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

export const usePagination = (props: usePaginationProps) => {
  const paginationRange = useMemo(() => {

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = props.siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..props.totalPages]
    */
    if (totalPageNumbers >= props.totalPages) {
      return range(1, props.totalPages);
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and props.totalPages
    */
    const leftSiblingIndex = Math.max(props.currentPage - props.siblingCount, 1);
    const rightSiblingIndex = Math.min(
      props.currentPage + props.siblingCount,
      props.totalPages
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and props.totalPages. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < props.totalPages - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < props.totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = props.totalPages;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * props.siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, props.totalPages];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 3 + 2 * props.siblingCount;
      let rightRange = range(
        props.totalPages - rightItemCount + 1,
        props.totalPages
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [props.totalPages, props.pageSize, props.siblingCount, props.currentPage]);

  return paginationRange;
};
