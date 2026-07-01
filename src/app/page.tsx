import { getAllArticles } from "@/lib/content";
import MainLayout from "@/components/MainLayout";
import HomepageClient from "@/components/HomepageClient";

export default function HomePage() {
  const articles = getAllArticles();
  return (
    <MainLayout>
      <HomepageClient articles={articles} />
    </MainLayout>
  );
}
