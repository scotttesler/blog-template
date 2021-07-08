import { Fragment } from "react";
import Link from "next/link";
import { format as formatDate } from "date-fns";

export default function PostHeader({
  authors = [],
  date = "",
  tags = [],
  title,
}) {
  const dateObj = new Date(date);

  return (
    <div className="pb-16 pt-9">
      <h1 className="break-words font-bold hyphens-auto mb-16 text-7xl">
        {title}
      </h1>
      <div className="flex text-sm">
        <div className="mr-16">
          <div className="mb-2 font-bold">Authors</div>
          <span>{authors.join(", ")}</span>
        </div>
        <div className="mr-16">
          <div className="mb-2 font-bold">Published at</div>
          <div>{formatDate(dateObj, "MM/d/Y")}</div>
        </div>
        <div>
          <div className="mb-2 font-bold">Tags</div>
          <span>
            {tags.map((tag, i) => (
              <Fragment key={i}>
                <Link href="/">
                  <a>{tag}</a>
                </Link>
                {i !== tags.length - 1 && <span>&ensp;</span>}
              </Fragment>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
