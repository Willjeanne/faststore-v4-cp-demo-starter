import {
  findCategoryBySlug,
  type CategoryNode,
} from './buildCategoryTree'

export type MegaMenuCustomLink = {
  text: string
  url: string
}

export type MegaMenuCmsItem = {
  label?: string
  categorySlug?: string
  url?: string
  showSubcategories?: boolean
  extraLinks?: MegaMenuCustomLink[]
  children?: MegaMenuCustomLink[]
}

export type ResolvedMegaMenuItem = {
  key: string
  label: string
  href: string
  children: Array<{
    key: string
    label: string
    href: string
  }>
}

export function resolveMegaMenuItems({
  tree,
  items,
  includeUnlistedDepartments = false,
}: {
  tree: CategoryNode[]
  items?: MegaMenuCmsItem[]
  includeUnlistedDepartments?: boolean
}): ResolvedMegaMenuItem[] {
  const cmsItems = items?.filter(
    (item) => item.categorySlug?.trim() || item.label?.trim() || item.url?.trim()
  )

  if (!cmsItems?.length) {
    return tree.map((department) => ({
      key: department.id,
      label: department.name,
      href: department.href,
      children: department.children.map((child) => ({
        key: child.id,
        label: child.name,
        href: child.href,
      })),
    }))
  }

  const selectedSlugs = new Set(
    cmsItems
      .map((item) => item.categorySlug?.replace(/^\/+|\/+$/g, '').toLowerCase())
      .filter(Boolean) as string[]
  )

  const resolved = cmsItems
    .map((item, index) => {
      const slug = item.categorySlug?.replace(/^\/+|\/+$/g, '').toLowerCase()
      const category = slug ? findCategoryBySlug(tree, slug) : undefined
      const showSubcategories = item.showSubcategories !== false

      const categoryChildren =
        showSubcategories && category
          ? category.children.map((child) => ({
              key: child.id,
              label: child.name,
              href: child.href,
            }))
          : []

      const customChildren = (item.children ?? [])
        .filter((child) => child.text && child.url)
        .map((child, childIndex) => ({
          key: `custom-child-${index}-${childIndex}`,
          label: child.text,
          href: child.url,
        }))

      const extraLinks = (item.extraLinks ?? [])
        .filter((link) => link.text && link.url)
        .map((link, linkIndex) => ({
          key: `extra-${index}-${linkIndex}`,
          label: link.text,
          href: link.url,
        }))

      const label = item.label?.trim() || category?.name
      const href = category?.href || item.url?.trim()

      if (!label || !href) return null

      return {
        key: category?.id ?? `custom-${index}-${label}`,
        label,
        href,
        children: [...categoryChildren, ...customChildren, ...extraLinks],
      }
    })
    .filter(Boolean) as ResolvedMegaMenuItem[]

  if (!includeUnlistedDepartments) {
    return resolved
  }

  const unlisted = tree
    .filter((department) => !selectedSlugs.has(department.slug))
    .map((department) => ({
      key: department.id,
      label: department.name,
      href: department.href,
      children: department.children.map((child) => ({
        key: child.id,
        label: child.name,
        href: child.href,
      })),
    }))

  return [...resolved, ...unlisted]
}
