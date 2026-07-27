import GitHubStats from "@/components/github/GitHubStats";
import SkillsGrid from "@/components/skills/SkillsGrid";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Timeline } from "@/components/experience/Timeline";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { ContactForm } from "@/components/contact/ContactForm";
import CertificateGrid from "@/components/certificates/CertificateGrid";
import type { ProjectListItem } from "@/types/project";
import type { BlogListItem } from "@/types/blog";
import type { CertificationListItem } from "@/types/certification";

type HomeSectionsProps = {
  experiences: any[];
  projects: ProjectListItem[];
  blogs: BlogListItem[];
  certifications: CertificationListItem[];
};

export default function HomeSections({ experiences, projects, blogs, certifications }: HomeSectionsProps) {
  return (
    <>
      <GitHubStats />
      <SkillsGrid />
      <ProjectGrid initialData={projects} />
      <Timeline initialData={experiences} />
      <CertificateGrid initialData={certifications} />
      <ArticleGrid initialData={blogs} />
      <ContactForm />
    </>
  );
}
