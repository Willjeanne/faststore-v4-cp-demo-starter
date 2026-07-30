export type FlatCollection = {
  id: string
  slug: string
  type: string
  name: string
}

export type CategoryNode = {
  id: string
  name: string
  slug: string
  href: string
  type: string
  children: CategoryNode[]
}

const CATEGORY_TYPES = new Set(['Department', 'Category', 'SubCategory'])

export function buildCategoryTree(
  collections: FlatCollection[]
): CategoryNode[] {
  const categories = collections.filter((item) =>
    CATEGORY_TYPES.has(item.type)
  )

  const bySlug = new Map<string, CategoryNode>()
  const roots: CategoryNode[] = []

  const sorted = [...categories].sort(
    (a, b) => a.slug.split('/').length - b.slug.split('/').length
  )

  for (const collection of sorted) {
    const slug = collection.slug.replace(/^\/+|\/+$/g, '').toLowerCase()
    if (!slug || bySlug.has(slug)) continue

    const node: CategoryNode = {
      id: collection.id,
      name: collection.name,
      slug,
      href: `/${slug}`,
      type: collection.type,
      children: [],
    }

    bySlug.set(slug, node)

    const segments = slug.split('/')
    const parentSlug = segments.slice(0, -1).join('/')

    if (parentSlug && bySlug.has(parentSlug)) {
      bySlug.get(parentSlug)?.children.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}

export function findCategoryBySlug(
  tree: CategoryNode[],
  slug: string
): CategoryNode | undefined {
  const normalized = slug.replace(/^\/+|\/+$/g, '').toLowerCase()

  for (const node of tree) {
    if (node.slug === normalized) return node

    const nested = findCategoryBySlug(node.children, normalized)
    if (nested) return nested
  }

  return undefined
}
