import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-5 pt-10 pb-28 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-ink/65 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <strong className="font-display text-base text-ink">{site.name}</strong> · {site.city}
        </p>
        <p>
          Feito com React, TypeScript, Tailwind e Motion por {site.author.name}
          {site.author.github && (
            <>
              {' · '}
              <a
                href={site.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-terra-700 underline-offset-4 hover:underline"
              >
                GitHub
              </a>
            </>
          )}
        </p>
      </div>
    </footer>
  )
}
