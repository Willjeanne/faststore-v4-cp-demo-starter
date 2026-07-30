import styles from './ArticleChapo.module.scss'

interface ArticleChapoProps {
  eyebrow?: string
  title?: string
  lead: string
  author?: string
  date?: string
  readingTime?: string
}

function ArticleChapo({
  eyebrow,
  title,
  lead,
  author,
  date,
  readingTime,
}: ArticleChapoProps) {
  return (
    <section className={`section ${styles.container}`}>
      <div className={`${styles.inner} layout__content`}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        {title && <h1 className={styles.title}>{title}</h1>}
        <p className={styles.lead}>{lead}</p>
        {(author || date || readingTime) && (
          <div className={styles.meta}>
            {author && <span className={styles.author}>{author}</span>}
            {(date || readingTime) && (
              <span className={styles.metaSecondary}>
                {date && <time>{date}</time>}
                {date && readingTime && <span className={styles.dot}>·</span>}
                {readingTime && <span>{readingTime}</span>}
              </span>
            )}
          </div>
        )}
        <div className={styles.divider} aria-hidden="true" />
      </div>
    </section>
  )
}

ArticleChapo.$componentKey = 'ArticleChapo'

export default ArticleChapo
