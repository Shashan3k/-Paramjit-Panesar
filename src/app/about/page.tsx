import type { Metadata } from 'next';
import { ExecutiveTeam } from '@/components/about/ExecutiveTeam';
import { Avatar } from '@/components/ui/Avatar';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ABOUT_COPY, HOME_COPY } from '@/data/copy';
import { ABOUT_CONTENT, DOCUMENTS } from '@/data/site';
import { BOARD_OF_DIRECTORS, EXECUTIVE_TEAM, PAST_BOARD_MEMBERS } from '@/data/leadership';
import { buildMetadata } from '@/lib/seo';
import { T } from '@/i18n';

export const metadata: Metadata = buildMetadata({
  title: 'About CHCA Health: Our Mission, Services, and Commitment',
  description:
    "Learn about CHCA Health's mission, services, board, and executive team. We are a non-profit health center serving Central Valley communities. Call or visit us.",
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHero title={ABOUT_COPY.heroTitle} subtitle={ABOUT_COPY.heroSubtitle} eyebrow={HOME_COPY.about.eyebrow} />

      <Section headingId="about-story-heading" title={HOME_COPY.about.title}>
        <p className="max-w-4xl text-lg leading-relaxed text-navy-800">{ABOUT_CONTENT.intro}</p>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-navy-800">
          Federally Qualified Health Center look-alike status is recognised by the U.S. Department of Health and Human Services. For
          the official directory of health centers and program information, see the{' '}
          <a
            href="https://findahealthcenter.hrsa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-800 hover:underline"
          >
            HRSA Health Center Directory<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </Section>

      <Section headingId="values-heading" title={ABOUT_COPY.valuesTitle} tone="muted">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="card border-l-4 border-l-teal-700">
            <h3 className="text-xl font-bold text-navy-900"><T>{ABOUT_COPY.missionTitle}</T></h3>
            <p className="mt-3 text-lg leading-relaxed text-navy-800">{ABOUT_CONTENT.mission}</p>
          </article>
          <article className="card border-l-4 border-l-navy-700">
            <h3 className="text-xl font-bold text-navy-900"><T>{ABOUT_COPY.visionTitle}</T></h3>
            <p className="mt-3 text-lg leading-relaxed text-navy-800">{ABOUT_CONTENT.vision}</p>
          </article>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_CONTENT.values.map((value) => (
            <li key={value.title} className="card">
              <h3 className="text-lg font-bold text-navy-900">{value.title}</h3>
              <p className="mt-2 text-navy-700">{value.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section headingId="board-heading" title={ABOUT_COPY.boardTitle} description={ABOUT_COPY.boardDescription}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {BOARD_OF_DIRECTORS.map((member) => (
            <li key={member.name} className="card flex flex-col items-center gap-3 text-center">
              <Avatar name={member.name} src={member.photo} size={96} />
              <div>
                <p className="font-bold text-navy-900">{member.name}</p>
                {member.role ? <p className="text-sm font-semibold text-teal-800">{member.role}</p> : null}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <h3 className="text-lg font-bold text-navy-900"><T>{ABOUT_COPY.pastBoardTitle}</T></h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {PAST_BOARD_MEMBERS.map((name) => (
              <li key={name} className="rounded-full bg-warm-200 px-3 py-1 text-sm text-navy-800">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id={ABOUT_COPY.teamAnchor}
        headingId="executive-heading"
        title={ABOUT_COPY.executiveTitle}
        description={ABOUT_COPY.executiveDescription}
        tone="muted"
      >
        <ExecutiveTeam leaders={EXECUTIVE_TEAM} />
      </Section>

      <Section headingId="about-documents-heading" title={ABOUT_COPY.documentsTitle}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={DOCUMENTS.patientRights.href} variant="outline" external>
            {DOCUMENTS.patientRights.label} (PDF)
          </ButtonLink>
          <ButtonLink href={DOCUMENTS.companyProfile.href} variant="outline" external>
            {DOCUMENTS.companyProfile.label} (PDF)
          </ButtonLink>
          <ButtonLink href="/marketing-outreach" variant="outline">
            Marketing Outreach
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
