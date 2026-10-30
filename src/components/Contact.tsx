import { profile } from "@/content/site";

/**
 * The close. The monolith returns, lit, on the right — the page ends on the
 * image it opened with — and the ways to reach Devang sit on the dark left.
 */
export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover [background-position:78%_50%] opacity-70"
        style={{ backgroundImage: "url(/media/og-background.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60 lg:bg-gradient-to-r lg:from-ink lg:via-ink/70 lg:to-transparent" aria-hidden />

      <div className="relative flex flex-1 flex-col justify-center px-5 py-28 sm:px-10 lg:px-[6vw]">
        <p className="eyebrow text-amber">Contact</p>
        <h2 className="display mt-4 max-w-3xl text-[calc(clamp(3rem,8vw,7.5rem)*var(--ds))]">Let&apos;s build what&apos;s next.</h2>
        <p className="mt-6 flex items-center gap-2 text-paper/75">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
          {profile.availability} — {profile.location}, {profile.workMode}.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={profile.emailHref} className="btn btn-solid">
            {profile.email}
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Résumé ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            GitHub ↗
          </a>
        </div>
      </div>

      <footer className="relative flex flex-col gap-2 border-t border-line px-5 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-10 lg:px-[6vw]">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.role}, Mumbai</span>
      </footer>
    </section>
  );
}
