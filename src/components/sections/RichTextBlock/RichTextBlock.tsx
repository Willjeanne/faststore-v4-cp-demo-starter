import { RichText } from 'src/components/ui/RichText'

import styles from './RichTextBlock.module.scss'

interface RichTextSection {
  subtitle?: string
  body: string
}

interface RichTextBlockProps {
  layout?: 'centered' | 'left' | 'two-columns'
  sections?: RichTextSection[]
  dropCap?: boolean
}

function RichTextBlock({
  layout = 'centered',
  sections = [],
  dropCap = false,
}: RichTextBlockProps) {
  if (!sections.length) return null

  return (
    <section className={`section ${styles.container}`} data-layout={layout}>
      <div className={`${styles.inner} layout__content`}>
        {sections.map((section, i) => (
          <div key={i} className={styles.section}>
            {section.subtitle && (
              <h3 className={styles.subtitle}>{section.subtitle}</h3>
            )}
            <div
              className={`${styles.body} ${
                dropCap && i === 0 ? styles.dropCap : ''
              }`}
            >
              <RichText as="div" content={section.body} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

RichTextBlock.$componentKey = 'RichTextBlock'

export default RichTextBlock
