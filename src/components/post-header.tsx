import { format as formatDate } from "date-fns";
import Link from "next/link";
import { Fragment } from "react";

type PostHeaderProps = {
  authors?: string[];
  date?: string;
  tags?: string[];
  title: string;
};

export function PostHeader({
  authors = [],
  date = "",
  tags = [],
  title,
}: PostHeaderProps) {
  const dateObj = date ? new Date(date) : null;

  return (
    <div className="pb-16 pt-9">
      <h1 className="hyphens-auto mb-16 break-words text-7xl font-bold">
        {title}
      </h1>
      <div className="flex flex-wrap gap-y-6 text-sm">
        <div className="mr-16">
          <div className="mb-2 font-bold">Authors</div>
          <span>{authors.join(", ")}</span>
        </div>
        <div className="mr-16">
          <div className="mb-2 font-bold">Published at</div>
          <div>
            {dateObj && !Number.isNaN(dateObj.getTime())
              ? formatDate(dateObj, "MM/d/yyyy")
              : null}
          </div>
        </div>
        <div>
          <div className="mb-2 font-bold">Tags</div>
          <span>
            {tags.map((tag, index) => (
              <Fragment key={tag}>
                <Link className="hover:underline" href="/">
                  {tag}
                </Link>
                {index !== tags.length - 1 ? <span>&ensp;</span> : null}
              </Fragment>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
