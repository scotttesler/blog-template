import { format as formatDate } from "date-fns";
import { Avatar, AvatarStack } from "@primer/components";
// import Avatar from "boring-avatars";
import Link from "next/link";

export default function PostPreview({
  authors = [],
  date = "",
  excerpt,
  slug,
  tags = [],
  title,
  thumbnail,
}) {
  const dateObj = new Date(date);

  const authorImages = authors.map((name, i) => {
    return (
      <>
        <span title={name}>
          <Avatar
            colors={["#a3a948", "#edb92e", "#f85931", "#ce1836", "#009989"]}
            key={i}
            name={name}
            size={30}
            variant="beam"
          />
        </span>
        {i !== authors.length - 1 && <span> </span>}
      </>
    );
  });

  return (
    <div className="post">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a className="link">
          <img alt={title} className="thumbnail" src={thumbnail} />
          <h1 className="title">{title}</h1>
          <div className="excerpt">{excerpt}</div>
          <AvatarStack>
            <Avatar
              alt="Primer"
              src="https://avatars.githubusercontent.com/primer"
            />
            <Avatar
              alt="GitHub"
              src="https://avatars.githubusercontent.com/github"
            />
            <Avatar
              alt="Atom"
              src="https://avatars.githubusercontent.com/atom"
            />
            <Avatar
              alt="Desktop"
              src="https://avatars.githubusercontent.com/desktop"
            />
          </AvatarStack>
          <div className="date">{formatDate(dateObj, "MM/d/Y")}</div>
        </a>
      </Link>
      <div className="tags">
        {tags.map((tag, i) => (
          <>
            <Link href="/">
              <a>{tag}</a>
            </Link>
            {i !== tags.length - 1 && <span>&ensp;</span>}
          </>
        ))}
      </div>
      <style jsx>{`
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

        .excerpt {
          margin-bottom: 1rem;
        }

        .tags {
          font-size: 0.8rem;
          color: var(--color-2);
        }

        .title {
          margin: 1rem 0;
        }

        @media (min-width: 920px) {
          .post {
            grid-column: auto / span 1;
          }
        }
      `}</style>
    </div>
  );
}
