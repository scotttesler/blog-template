import Link from "next/link";
import { Layout } from "@/components/layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="py-24 text-center">
        <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
        <p className="mb-8 opacity-70">That page does not exist.</p>
        <Link className="underline" href="/">
          Back home
        </Link>
      </div>
    </Layout>
  );
}
