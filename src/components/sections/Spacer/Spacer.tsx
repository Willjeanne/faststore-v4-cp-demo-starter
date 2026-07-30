import styles from './Spacer.module.scss'

interface SpacerProps {
  height?: number
  backgroundColor?: 'white' | 'navy' | 'red' | 'gold' | 'light-grey'
}

function Spacer({
  height = 40,
  backgroundColor = 'white',
}: SpacerProps) {
  return (
    <section className={`section ${styles.spacer}`} data-bg={backgroundColor}>
      <div
        className="layout__content"
        style={{ height: `${height}px` }}
        aria-hidden="true"
      />
    </section>
  )
}

Spacer.$componentKey = 'Spacer'

export default Spacer
