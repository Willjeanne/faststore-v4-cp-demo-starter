'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsBlock.module.scss'

interface Stat {
  value: string
  label: string
  suffix?: string
  valueStyle?: 'normal' | 'bold' | 'italic'
  labelStyle?: 'normal' | 'bold' | 'italic'
}

interface StatsBlockProps {
  title?: string
  stats?: Stat[]
  backgroundColor?: 'navy' | 'red' | 'white'
  animateCount?: boolean
}

function useCountUp(target: string, duration = 1500, active = false) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!active) return
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(numeric)) {
      setDisplay(target)
      return
    }
    const start = performance.now()
    const isDecimal = target.includes('.')
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numeric * eased
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString())
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [active, target, duration])

  return display
}

function StatItem({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.value, 1500, animate)
  const numeric = !isNaN(parseFloat(stat.value.replace(/[^0-9.]/g, '')))
  const displayValue = animate && numeric ? count : stat.value

  return (
    <div className={styles.stat}>
      <span
        className={styles.value}
        data-style={stat.valueStyle ?? 'bold'}
      >
        {displayValue}
        {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
      </span>
      <span
        className={styles.label}
        data-style={stat.labelStyle ?? 'normal'}
      >
        {stat.label}
      </span>
    </div>
  )
}

function StatsBlock({
  title,
  stats = [],
  backgroundColor = 'navy',
  animateCount = true,
}: StatsBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`section ${styles.container}`}
      data-bg={backgroundColor}
    >
      <div className="layout__content">
        {title && <p className={styles.title}>{title}</p>}
        <div
          className={styles.grid}
          style={{ '--stat-count': stats.length } as React.CSSProperties}
        >
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} animate={animateCount && visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

StatsBlock.$componentKey = 'StatsBlock'

export default StatsBlock
