import styles from './HeroBanner.module.scss'

type TextPosition =
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'center-left' | 'center-center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface HeroBannerProps {
  // CMS field names (from schema)
  imageDesktop?: string
  imageMobile?: string
  imageAlt?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaUrl?: string
  textPosition?: TextPosition
  textColor?: 'white' | 'black'
  overlayOpacity?: number
  // Legacy aliases (for backward compat)
  image?: string
  linkUrl?: string
  linkLabel?: string
}

function HeroBanner({
  imageDesktop,
  image,
  imageAlt = '',
  imageMobile,
  title,
  subtitle,
  ctaLabel,
  ctaUrl,
  linkLabel,
  linkUrl,
  textPosition = 'bottom-left',
  textColor = 'white',
  overlayOpacity = 30,
}: HeroBannerProps) {
  // Normalise prop aliases
  const resolvedImage = imageDesktop ?? image ?? ''
  const resolvedCtaLabel = ctaLabel ?? linkLabel
  const resolvedCtaUrl = ctaUrl ?? linkUrl
  const opacity = Math.min(100, Math.max(0, overlayOpacity)) / 100

  const inner = (
    <div
      className={styles.hero}
      data-text-color={textColor}
      data-position={textPosition}
    >
      {resolvedImage && (
        <>
          <img
            src={resolvedImage}
            alt={imageAlt}
            className={`${styles.image} ${imageMobile ? styles.imageDesktop : ''}`}
            loading="eager"
          />
          {imageMobile && (
            <img
              src={imageMobile}
              alt={imageAlt}
              className={`${styles.image} ${styles.imageMobile}`}
              loading="eager"
            />
          )}
        </>
      )}

      <div
        className={styles.overlay}
        style={{ '--hero-overlay-opacity': opacity } as React.CSSProperties}
      />

      <div className={`${styles.content} layout__content`}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {resolvedCtaUrl && resolvedCtaLabel && (
          <span className={styles.cta}>{resolvedCtaLabel}</span>
        )}
      </div>
    </div>
  )

  if (resolvedCtaUrl) {
    return (
      <section className="section">
        <a href={resolvedCtaUrl} className={styles.link} aria-label={title ?? resolvedCtaLabel}>
          {inner}
        </a>
      </section>
    )
  }

  return <section className="section">{inner}</section>
}

HeroBanner.$componentKey = 'HeroBanner'

export default HeroBanner
