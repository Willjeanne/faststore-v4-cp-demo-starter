import type { ComponentProps } from 'react'
import { getOverriddenSection, NavbarSection } from '@faststore/core'

import DemoSignIn from './DemoSignIn'
import styles from './demo-navbar.module.scss'

const OverriddenNavbar = getOverriddenSection({
  Section: NavbarSection,
  className: styles.demoNavbar,
  components: {
    _experimentalButtonSignIn: {
      Component: DemoSignIn,
    },
  },
})

function DemoNavbar(props: ComponentProps<typeof NavbarSection>) {
  return (
    <div className={styles.demoNavbarShell}>
      <div className={styles.utilityBar}>
        <div className={`${styles.utilityBarInner} layout__content`}>
          <a href="/support">Customer Support</a>
          <span aria-hidden="true">|</span>
          <span>Demo Store</span>
          <span aria-hidden="true">|</span>
          <a href="/fr">FR</a>
        </div>
      </div>
      <OverriddenNavbar {...props} />
    </div>
  )
}

export default DemoNavbar
