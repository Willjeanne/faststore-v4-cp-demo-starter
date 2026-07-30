import { useEffect } from 'react'

import Carousel from 'src/components/ui/Carousel'
import { Image } from 'src/components/ui/Image'
import Link from 'src/components/ui/Link'

import styles from './banner-carousel.module.scss'

export type BannerSlide = {
  image: {
    src: string
    alt: string
  }
  title?: string
  subtitle?: string
  ctaText?: string
  link?: {
    url: string
    linkTargetBlank?: boolean
  }
}

export type BannerCarouselProps = {
  banners: BannerSlide[]
  infiniteMode?: boolean
  autoplay?: boolean
  autoplayInterval?: number
}

const CAROUSEL_ID = 'banner-carousel'

function BannerCarousel({
  banners,
  infiniteMode = true,
  autoplay = true,
  autoplayInterval = 6000,
}: BannerCarouselProps) {
  useEffect(() => {
    if (!autoplay || banners.length <= 1) return

    const interval = window.setInterval(() => {
      const nextControl = document.querySelector<HTMLButtonElement>(
        `#${CAROUSEL_ID} [data-fs-carousel-control="right"]`
      )

      nextControl?.click()
    }, autoplayInterval)

    return () => window.clearInterval(interval)
  }, [autoplay, autoplayInterval, banners.length])

  if (!banners?.length) return null

  return (
    <section className={`section ${styles.bannerCarousel}`}>
      <div className={`${styles.container} layout__content`}>
        <Carousel
          id={CAROUSEL_ID}
          variant="slide"
          itemsPerPage={1}
          infiniteMode={infiniteMode}
        >
          {banners.map((banner, index) => {
            const hasOverlay =
              banner.title || banner.subtitle || banner.ctaText

            const slide = (
              <div className={styles.slide}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={banner.image.src}
                    alt={banner.image.alt}
                    fill
                    sizes="100vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                    className={styles.image}
                  />
                </div>

                {hasOverlay && (
                  <div className={styles.overlay}>
                    {banner.title && (
                      <h2 className={styles.title}>{banner.title}</h2>
                    )}
                    {banner.subtitle && (
                      <p className={styles.subtitle}>{banner.subtitle}</p>
                    )}
                    {banner.ctaText && (
                      <span className={styles.cta}>{banner.ctaText}</span>
                    )}
                  </div>
                )}
              </div>
            )

            return banner.link?.url ? (
              <Link
                key={`${banner.image.src}-${index}`}
                href={banner.link.url}
                target={banner.link.linkTargetBlank ? '_blank' : undefined}
                rel={
                  banner.link.linkTargetBlank ? 'noopener noreferrer' : undefined
                }
                className={styles.slideLink}
              >
                {slide}
              </Link>
            ) : (
              <div key={`${banner.image.src}-${index}`}>{slide}</div>
            )
          })}
        </Carousel>
      </div>
    </section>
  )
}

BannerCarousel.$componentKey = 'BannerCarousel'

export default BannerCarousel
