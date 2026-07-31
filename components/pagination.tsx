import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
};

function hrefForPage(page: number) {
  return page <= 1 ? "/" : `/page/${page}`;
}

export function Pagination({ page, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex flex-wrap items-center justify-center gap-3 text-sm"
    >
      {page > 1 ? (
        <Link className="hover:underline" href={hrefForPage(page - 1)}>
          Previous
        </Link>
      ) : (
        <span className="opacity-40">Previous</span>
      )}

      <ol className="flex items-center gap-2">
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            {pageNumber === page ? (
              <span
                aria-current="page"
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-neutral-900 px-2 font-semibold text-white dark:bg-neutral-100 dark:text-neutral-900"
              >
                {pageNumber}
              </span>
            ) : (
              <Link
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                href={hrefForPage(pageNumber)}
              >
                {pageNumber}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {page < totalPages ? (
        <Link className="hover:underline" href={hrefForPage(page + 1)}>
          Next
        </Link>
      ) : (
        <span className="opacity-40">Next</span>
      )}
    </nav>
  );
}
