import { SITE_URL } from './agent-content.js';
import human from '../src/humans.json' with { type: 'json' };

export function blogSummaries(posts) {
  const blogs = posts.map(({ data, date, url }) => {
    const slug = url.split('/').filter(Boolean).at(-1);
    return {
      slug,
      title: data.title,
      description: data.description,
      postedAt: date.toISOString(),
      updatedAt: new Date(data.dateModified || date).toISOString(),
      imageUrl: new URL(data.ogImage || '/images/og-image.jpg', SITE_URL).href,
      url: new URL(url, SITE_URL).href,
      apiUrl: `${SITE_URL}/api/blog/${slug}`,
    };
  });
  return blogs.sort((a, b) => b.postedAt.localeCompare(a.postedAt) || a.slug.localeCompare(b.slug));
}

export function publicProfile(pages) {
  const resume = pages.find(page => page.url === '/resume/');
  const person = JSON.parse(resume.data.jsonLd).mainEntity;
  return {
    name: person.name,
    role: person.jobTitle,
    organization: person.worksFor.name,
    summary: human.description,
    experience: person.hasOccupation.experienceRequirements,
    previousOrganizations: person.alumniOf.map(org => org.name),
    skills: person.knowsAbout,
    url: `${SITE_URL}/about/`,
    resumeUrl: new URL(resume.url, SITE_URL).href,
  };
}
