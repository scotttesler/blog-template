import { format as formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type PostPreviewProps = {
  date?: string;
  slug: string;
  tags?: string[];
  thumbnail: string;
  title: string;
};

export function PostPreview({
  date = "",
  slug,
  tags = [],
  thumbnail,
  title,
}: PostPreviewProps) {
  const dateObj = date ? new Date(date) : null;

  return (
    <div className="hyphens-auto break-words text-center">
      <Link className="link block" href={`/posts/${slug}`}>
        {thumbnail ? (
          <Image
            alt={title}
            className="mx-auto h-auto w-full transform transition duration-150 ease-in-out hover:scale-[1.02]"
            height={400}
            src={thumbnail}
            width={600}
          />
        ) : null}
        <h2 className="mb-4 mt-8 text-xl font-bold">{title}</h2>
        {dateObj && !Number.isNaN(dateObj.getTime()) ? (
          <div className="text-sm">{formatDate(dateObj, "MM/d/yyyy")}</div>
        ) : null}
      </Link>
      <div className="text-sm opacity-70">
        {tags.map((tag, index) => (
          <Fragment key={tag}>
            {tag}
            {index !== tags.length - 1 ? <span>&ensp;</span> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
