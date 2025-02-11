// ** Next, React And Locals Imports
import { redirect } from "next/navigation";
import { fetchStaticPagesAPI } from "@/actions/staticpages.actions";
import StaticPages from "@/components/StaticPages/StaticPages";

export default async function StaticPage({ params }) {
  const { content } = await params;

  // Static pages data
  const staticPages = await fetchStaticPagesAPI();

  // Get the current page
  const currentPage = staticPages?.find((item) => {
    return item.pageName === content;
  });

  // Redirect to 404, if no page found
  if (!currentPage) {
    redirect("/404");
  }

  return <StaticPages page={currentPage} />;
}
