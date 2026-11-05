import { CheckCircle2 } from 'lucide-react';
import { SERVICE_GROUPS } from '@/data/practice';

/** The service groups as cards. Services offered only: no outcome or treatment claims. */
export function ServiceGroups({ only }: { only?: readonly string[] }) {
  const groups = only ? SERVICE_GROUPS.filter((g) => only.includes(g.title)) : SERVICE_GROUPS;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="card">
          <h3 className="text-xl font-bold text-navy-900">{group.title}</h3>
          <ul className="mt-3 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-navy-800">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
