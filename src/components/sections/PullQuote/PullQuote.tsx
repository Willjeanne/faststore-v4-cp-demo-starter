import styles from './PullQuote.module.scss'

interface PullQuoteProps {
  quote: string
  attribution?: string
  role?: string
  backgroundColor?: 'navy' | 'red' | 'white' | 'gold'
  size?: 'default' | 'large'
}

function PullQuote({
  quote,
  attribution,
  role,
  backgroundColor = 'white',
  size = 'default',
}: PullQuoteProps) {
  return (
    <section
      className={`section ${styles.container}`}
      data-bg={backgroundColor}
      data-size={size}
    >
      <div className={`${styles.inner} layout__content`}>
        <span className={styles.openingMark} aria-hidden="true">"</span>
        <blockquote className={styles.quote}>
          <p>{quote}</p>
        </blockquote>
        <span className={styles.closingMark} aria-hidden="true">"</span>
        {(attribution || role) && (
          <footer className={styles.attribution}>
            {attribution && <cite className={styles.name}>{attribution}</cite>}
            {role && <span className={styles.role}>{role}</span>}
          </footer>
        )}
      </div>
    </section>
  )
}

PullQuote.$componentKey = 'PullQuote'

export default PullQuote
