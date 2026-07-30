import { Icon } from '@faststore/ui'

import storeConfig from 'discovery.config'
import LinkButton from 'src/components/ui/LinkButton'
import { useSession } from 'src/sdk/session'

import styles from './demo-navbar.module.scss'

type DemoSignInProps = {
  label: string
  myAccountLabel: string
  icon: { alt: string; icon: string }
}

function DemoSignIn({ label, myAccountLabel, icon }: DemoSignInProps) {
  const { person } = useSession()

  const getAccountUrl = () => {
    if (!person?.id) return '/login'

    const enableFaststoreMyAccount =
      storeConfig.experimental?.enableFaststoreMyAccount

    return enableFaststoreMyAccount ? '/pvt/account' : storeConfig.accountUrl
  }

  const primaryLabel = person?.id ? myAccountLabel : label
  const secondaryLabel = person?.id ? label : myAccountLabel

  return (
    <LinkButton
      data-fs-button-signin-link
      href={getAccountUrl()}
      className={styles.signInButton}
      aria-label={icon.alt}
      variant="tertiary"
      icon={
        <Icon name={icon.icon} width={22} height={22} weight="bold" />
      }
      iconPosition="left"
    >
      <span className={styles.signInText}>
        <strong>{primaryLabel}</strong>
        <span>{secondaryLabel}</span>
      </span>
    </LinkButton>
  )
}

export default DemoSignIn
