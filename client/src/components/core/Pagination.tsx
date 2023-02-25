import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePagination, DOTS } from "../../hooks/usePagination";
interface IPagination {
  total: number;
  page: number;
  limit: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => any;
}
const Pagination = (props: IPagination) => {
  const { total, limit, page, onPageChange } = props;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit > total ? total : startIndex + limit;

  const paginationRange = usePagination({
    totalCount: total,
    pageSize: limit,
    siblingCount: 1,
    currentPage: page,
  });

  if (paginationRange && paginationRange.length < 2) {
    return null;
  }

  //   const onNext = () => {
  //     onPageChange(page + 1);
  //   };

  //   const onPrevious = () => {
  //     onPageChange(page - 1);
  //   };
  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {startIndex == 0 ? 1 : startIndex}
            </span>{" "}
            to <span className="font-medium">{endIndex}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <li
              onClick={() => onPageChange(page - 1)}
              className={`cursor-pointer relative inline-flex items-center rounded-l-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500  focus:z-20 ${
                1 == page
                  ? " cursor-not-allowed bg-gray-100 pointer-events-none"
                  : " bg-white hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </li>
            {paginationRange &&
              paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                  return (
                    <span
                      key={index}
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <li
                    key={index}
                    onClick={() => onPageChange(pageNumber as number)}
                    aria-current="page"
                    className={`cursor-pointer relative hidden items-center border   px-4 py-2 text-sm font-medium  md:inline-flex  ${
                      pageNumber == page
                        ? "z-10 border-indigo-500 bg-indigo-50   text-indigo-600 focus:z-20"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:z-20"
                    }`}
                  >
                    {pageNumber}
                  </li>
                );
              })}

            <li
              onClick={() => onPageChange(page + 1)}
              className={`relative inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500  focus:z-20 ${
                lastPage == page
                  ? " cursor-not-allowed bg-gray-100 pointer-events-none"
                  : " bg-white hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </li>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
