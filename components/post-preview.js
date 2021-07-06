import { format as formatDate } from "date-fns";
import colorPalettes from "nice-color-palettes";
import Avatar from "boring-avatars";
import Link from "next/link";
import { Fragment } from "react";

export default function PostPreview({
  date = "",
  slug,
  tags = [],
  title,
  thumbnail,
}) {
  const dateObj = new Date(date);

  return (
    <div className="post">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="link">
          <img alt={title} className="thumbnail" src={thumbnail} />
          <h1 className="title">{title}</h1>

          <div>
            {[0, 1].map((name, i) => (
              <span key={i} style={{ marginRight: -8, zIndex: i }}>
                <Avatar
                  colors={colorPalettes[49]}
                  name={name.toString()}
                  size={20}
                  variant="beam"
                />
              </span>
            ))}
          </div>

          <div className="date">{formatDate(dateObj, "MM/d/Y")}</div>
        </a>
      </Link>
      <div className="tags">
        {tags.map((tag, i) => (
          <Fragment key={i}>
            <Link href="#">
              <a>{tag}</a>
            </Link>
            {i !== tags.length - 1 && <span>&ensp;</span>}
          </Fragment>
        ))}
      </div>
      {/* <style jsx>{`
        .link {
          text-decoration: none;
        }

        .post {
          grid-column: auto / span 2;
          text-align: center;
        }

        .post:hover .thumbnail {
          transform: scale(1.02);
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.25);
        }

        .thumbnail {
          box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.25);
          height: 560px;
          object-fit: cover;
          transition: all 0.15s ease;
        }

        .date {
          color: var(--color-2);
          font-size: 0.85rem;
          margin: 0.5rem 0;
        }

        .tags {
          font-size: 0.8rem;
          color: var(--color-2);
        }

        .title {
          margin: 1rem 0 0.1rem 0;
        }

        @media (min-width: 920px) {
          .post {
            grid-column: auto / span 1;
          }
        }
      `}</style> */}
    </div>
  );
}
