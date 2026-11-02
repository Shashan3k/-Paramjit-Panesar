'use client';

import { useId, useState } from 'react';
import { ABOUT_COPY } from '@/data/copy';
import type { LeaderRecord } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { T } from '@/i18n';

/**
 * Executive team grid. Each leader's bio opens in an accessible dialog. The
 * dialog traps focus, closes on Esc, and returns focus to the button that opened it.
 */
export function ExecutiveTeam({ leaders }: { leaders: readonly LeaderRecord[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const titleId = useId();
  const active = activeIndex === null ? null : (leaders[activeIndex] ?? null);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader, index) => (
          <li key={leader.slug}>
            <article className="card flex h-full flex-col items-start gap-4">
              <Avatar name={leader.name} src={leader.photo} size={112} />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy-900">{leader.name}</h3>
                <p className="mt-1 font-semibold text-teal-800">{leader.title}</p>
              </div>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setActiveIndex(index)}
                className="btn btn-outline"
              >
                <T>{ABOUT_COPY.readBio}</T><span className="sr-only"> for {leader.name}</span>
              </button>
            </article>
          </li>
        ))}
      </ul>

      <Modal open={active !== null} onClose={() => setActiveIndex(null)} labelledBy={titleId}>
        {active ? (
          <div className="space-y-4 pr-10">
            <div className="flex items-center gap-4">
              <Avatar name={active.name} src={active.photo} size={80} />
              <div>
                <h2 id={titleId} className="text-2xl font-bold text-navy-900">
                  {active.name}
                </h2>
                <p className="font-semibold text-teal-800">{active.title}</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed text-navy-800">{active.bio}</p>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
