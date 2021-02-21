export default function PostHeader({
  authors = [],
  date = "",
  tags = [],
  title,
}) {
  const dateObj = new Date(date);

  return (
    <div className="header">
      <h1 className="title">{title}</h1>
      <div className="info">
        <div>
          <div className="label">Authors</div>
          <span>{authors.join(", ")}</span>
        </div>
        <div>
          <div className="label">Published at</div>
          <div>
            {dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString()}
          </div>
        </div>
        <div>
          <div className="label">Tags</div>
          <span>{tags.join("\t")}</span>
        </div>
      </div>

      <style jsx>{`
        .header {
          padding-top: 2.25rem;
          padding-bottom: 4rem;
        }

        .info {
          display: flex;
          flex-wrap: wrap;
          font-size: 0.8rem;
        }

        .info > div {
          margin-right: 4rem;
        }

        .label {
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .title {
          font-size: 4rem;
          margin: 0 0 4rem 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
