import { Fragment } from "react";
import Link from "next/link";
import { format as formatDate } from "date-fns";

export default function PostPreview({
  date = "",
  slug,
  tags = [],
  title,
  thumbnail,
}) {
  const dateObj = new Date(date);

  return (
    <div className="text-center">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="link">
          <img
            alt={title}
            className="duration-[0.15s] ease-in-out hover:scale-[1.02] transform transition"
            src={thumbnail}
          />
          <h1 className="font-bold mb-4 mt-8">{title}</h1>
          <div className="text-sm">{formatDate(dateObj, "MM/d/Y")}</div>
        </a>
      </Link>
      <div className="text-sm">
        {tags.map((tag, i) => (
          <Fragment key={i}>
            {tag}
            {i !== tags.length - 1 && <span>&ensp;</span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
