import styles from './CategoryTiles.module.scss'

interface Tile {
  image?: string       // from media gallery
  imageUrl?: string    // alternative: external URL
  imageAlt?: string
  tag?: string
  title: string
  titleColor?: 'navy' | 'white' | 'red' | 'gold' | 'black'
  textAlign?: 'left' | 'center' | 'right'
  url: string
}

interface CategoryTilesProps {
  sectionTitle?: string
  tiles?: Tile[]
}

function CategoryTiles({
  sectionTitle,
  tiles = [],
}: CategoryTilesProps) {
  if (!tiles.length) return null

  return (
    <section className={`section ${styles.container}`}>
      <div className="layout__content">
        {sectionTitle && (
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        )}
        <div className={styles.grid}>
          {tiles.map((tile, i) => {
            const resolvedImage = tile.image ?? tile.imageUrl ?? ''
            return (
              <a
                key={i}
                href={tile.url}
                className={styles.tile}
                aria-label={tile.title}
              >
                <div className={styles.imageWrapper}>
                  {resolvedImage ? (
                    <img
                      src={resolvedImage}
                      alt={tile.imageAlt ?? tile.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} />
                  )}
                </div>
                <div
                  className={styles.content}
                  data-align={tile.textAlign ?? 'left'}
                >
                  {tile.tag && <span className={styles.tag}>{tile.tag}</span>}
                  <h3
                    className={styles.title}
                    data-color={tile.titleColor ?? 'navy'}
                  >
                    {tile.title}
                  </h3>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

CategoryTiles.$componentKey = 'CategoryTiles'

export default CategoryTiles
