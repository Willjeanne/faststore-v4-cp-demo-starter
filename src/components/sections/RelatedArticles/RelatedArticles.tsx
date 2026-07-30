import styles from './RelatedArticles.module.scss'

interface Article {
  image?: string
  imageAlt?: string
  tag?: string
  title: string
  url: string
}

interface RelatedArticlesProps {
  sectionTitle?: string
  articles?: Article[]
}

function RelatedArticles({
  sectionTitle = 'Related Articles',
  articles = [],
}: RelatedArticlesProps) {
  if (!articles.length) return null

  return (
    <section className={`section ${styles.container}`}>
      <div className="layout__content">
        {sectionTitle && (
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        )}
        <div className={styles.grid}>
          {articles.slice(0, 3).map((article, i) => (
            <a key={i} href={article.url} className={styles.card}>
              <div className={styles.imageWrapper}>
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.imageAlt ?? article.title}
                    className={styles.image}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
                {article.tag && (
                  <span className={styles.tag}>{article.tag}</span>
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{article.title}</h3>
                <span className={styles.cta} aria-hidden="true">
                  Read more
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

RelatedArticles.$componentKey = 'RelatedArticles'

export default RelatedArticles
