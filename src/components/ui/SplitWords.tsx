import { Fragment } from 'react'

/**
 * Wraps each word in a mask so it can slide up into view. The text appears once, with real spaces,
 * so search engines and screen readers read the plain sentence.
 */
export function SplitWords({ text, className = '', wordClass = 'sw' }: { text: string; className?: string; wordClass?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span className={wordClass}>{w}</span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}
