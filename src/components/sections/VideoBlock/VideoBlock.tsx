'use client'

import { useState } from 'react'
import styles from './VideoBlock.module.scss'

interface VideoBlockProps {
  sectionTitle?: string
  videoUrl?: string           // from VTEX Media gallery (typically a YouTube URL)
  videoUrlExternal?: string   // alternative: paste external URL (YouTube or direct .mp4/.webm/.mov)
  posterImage?: string
  posterAlt?: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16'
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  fullWidth?: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract YouTube video ID from any common URL format:
 *  - https://www.youtube.com/watch?v=ID
 *  - https://youtu.be/ID
 *  - https://www.youtube.com/embed/ID
 *  - https://www.youtube.com/shorts/ID
 */
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&]+)/,
    /(?:youtube\.com\/embed\/)([^?&]+)/,
    /(?:youtube\.com\/shorts\/)([^?&]+)/,
  ]
  for (const p of patterns) {
    const match = url.match(p)
    if (match?.[1]) return match[1]
  }
  return null
}

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url)
}

function buildYouTubeEmbed(
  id: string,
  { autoplay, loop, controls }: { autoplay: boolean; loop: boolean; controls: boolean }
): string {
  const params = new URLSearchParams()
  if (autoplay) {
    params.set('autoplay', '1')
    params.set('mute', '1') // browsers require muted for autoplay
  }
  if (loop) {
    params.set('loop', '1')
    params.set('playlist', id) // YouTube loop requires playlist param
  }
  if (!controls) params.set('controls', '0')
  params.set('rel', '0')        // no related videos
  params.set('modestbranding', '1')
  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}

// ─── Component ────────────────────────────────────────────────────────────────

function VideoBlock({
  sectionTitle,
  videoUrl,
  videoUrlExternal,
  posterImage,
  posterAlt,
  aspectRatio = '16:9',
  autoplay = false,
  loop = false,
  controls = true,
  fullWidth = false,
}: VideoBlockProps) {
  const [posterDismissed, setPosterDismissed] = useState(false)

  const resolvedUrl = videoUrl ?? videoUrlExternal ?? ''
  if (!resolvedUrl) return null

  const youtubeId = getYouTubeId(resolvedUrl)
  const directFile = !youtubeId && isDirectVideoFile(resolvedUrl)

  if (!youtubeId && !directFile) {
    // Unsupported URL — render nothing rather than break the page
    return null
  }

  const showPoster = posterImage && !posterDismissed

  return (
    <section
      className={`section ${styles.container}`}
      data-full-width={fullWidth}
    >
      <div className="layout__content">
        {sectionTitle && (
          <h2 className={styles.title}>{sectionTitle}</h2>
        )}

        <div
          className={styles.player}
          data-aspect={aspectRatio.replace(':', '-')}
        >
          {showPoster ? (
            <button
              type="button"
              className={styles.posterButton}
              onClick={() => setPosterDismissed(true)}
              aria-label="Play video"
            >
              <img
                src={posterImage}
                alt={posterAlt ?? ''}
                className={styles.poster}
                loading="lazy"
              />
              <span className={styles.playIcon} aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <circle cx="32" cy="32" r="32" opacity="0.85" />
                  <polygon points="26,20 48,32 26,44" fill="#fff" />
                </svg>
              </span>
            </button>
          ) : youtubeId ? (
            <iframe
              className={styles.iframe}
              src={buildYouTubeEmbed(youtubeId, {
                autoplay: autoplay || posterDismissed,
                loop,
                controls,
              })}
              title={sectionTitle ?? 'Video player'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <video
              className={styles.video}
              src={resolvedUrl}
              poster={posterImage}
              autoPlay={autoplay || posterDismissed}
              muted={autoplay || posterDismissed}
              loop={loop}
              controls={controls}
              preload="metadata"
              playsInline
              aria-label={sectionTitle ?? 'Video'}
            />
          )}
        </div>
      </div>
    </section>
  )
}

VideoBlock.$componentKey = 'VideoBlock'

export default VideoBlock
