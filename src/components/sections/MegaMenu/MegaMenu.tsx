import { useEffect, useMemo, useRef, useState } from 'react'

import Link from 'src/components/ui/Link'
import { useLink } from 'src/sdk/ui/useLink'

import styles from './mega-menu.module.scss'
import {
  resolveMegaMenuItems,
  type MegaMenuCmsItem,
} from './resolveMegaMenuItems'
import { useCategoryTree } from './useCategoryTree'

export type MegaMenuProps = {
  items?: MegaMenuCmsItem[]
  includeUnlistedDepartments?: boolean
  viewAllLabel?: string
}

function MegaMenu({
  items,
  includeUnlistedDepartments = false,
  viewAllLabel = 'View all',
}: MegaMenuProps) {
  const { tree, loading } = useCategoryTree()
  const { resolveLink } = useLink()
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const rootRef = useRef<HTMLElement>(null)

  const menuItems = useMemo(
    () =>
      resolveMegaMenuItems({
        tree,
        items,
        includeUnlistedDepartments,
      }),
    [tree, items, includeUnlistedDepartments]
  )

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenKey(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenKey(null)
        setMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  if (!loading && menuItems.length === 0) {
    return null
  }

  return (
    <section
      ref={rootRef}
      className={`section ${styles.megaMenu}`}
      data-fs-mega-menu
    >
      <div className={`${styles.bar} layout__content`}>
        <button
          type="button"
          className={styles.mobileToggle}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((current) => !current)}
        >
          Shop categories
        </button>

        <nav
          className={styles.nav}
          data-fs-mega-menu-nav
          data-fs-mega-menu-open={mobileOpen}
          aria-label="Category menu"
        >
          {loading && menuItems.length === 0 ? (
            <span className={styles.loading}>Loading categories…</span>
          ) : (
            <ul className={styles.list}>
              {menuItems.map((item) => {
                const isOpen = openKey === item.key
                const hasChildren = item.children.length > 0
                const href = resolveLink(item.href) ?? item.href

                return (
                  <li
                    key={item.key}
                    className={styles.item}
                    data-fs-mega-menu-item
                    data-fs-mega-menu-item-open={isOpen}
                    onMouseEnter={() => {
                      if (hasChildren) setOpenKey(item.key)
                    }}
                    onMouseLeave={() => setOpenKey(null)}
                  >
                    <div className={styles.triggerRow}>
                      <Link
                        href={href}
                        className={styles.trigger}
                        prefetch={false}
                        onClick={() => {
                          setOpenKey(null)
                          setMobileOpen(false)
                        }}
                      >
                        {item.label}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          className={styles.caretButton}
                          aria-expanded={isOpen}
                          aria-label={`${item.label} submenu`}
                          onClick={() =>
                            setOpenKey((current) =>
                              current === item.key ? null : item.key
                            )
                          }
                        >
                          <span aria-hidden="true">▾</span>
                        </button>
                      )}
                    </div>

                    {hasChildren && (
                      <div
                        className={styles.panel}
                        data-fs-mega-menu-panel
                        data-fs-mega-menu-panel-open={isOpen}
                      >
                        <div className={styles.panelInner}>
                          <Link
                            href={href}
                            className={styles.viewAll}
                            prefetch={false}
                            onClick={() => {
                              setOpenKey(null)
                              setMobileOpen(false)
                            }}
                          >
                            {viewAllLabel} {item.label}
                          </Link>

                          <ul className={styles.panelList}>
                            {item.children.map((child) => {
                              const childHref =
                                resolveLink(child.href) ?? child.href

                              return (
                                <li key={child.key}>
                                  <Link
                                    href={childHref}
                                    className={styles.panelLink}
                                    prefetch={false}
                                    onClick={() => {
                                      setOpenKey(null)
                                      setMobileOpen(false)
                                    }}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </nav>
      </div>
    </section>
  )
}

MegaMenu.$componentKey = 'MegaMenu'

export default MegaMenu
