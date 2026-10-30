import { profile } from "@/content/site";

/**
 * Quiet, fixed, and always readable over footage: a soft dark gradient
 * behind it rather than a blurred backdrop (blur re-samples every frame).
 */
export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="absolute inset-0 h-28 bg-gradient-to-b from-ink via-ink/75 to-transparent" aria-hidden />
      <nav className="pointer-events-auto relative flex items-center justify-between px-5 py-5 sm:px-10">
        <a href="#top" className="font-display text-lg leading-none">
          {profile.name}
        </a>

        <div className="flex items-center gap-4 text-sm sm:gap-6">
          <span className="hidden items-center gap-2 text-muted md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
            {profile.availability} · {profile.location}
          </span>
          <a href="#work" className="hidden transition-colors hover:text-amber sm:inline">
            Work
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber">
            Résumé ↗
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-4 py-2 transition-colors hover:border-amber hover:text-amber">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
