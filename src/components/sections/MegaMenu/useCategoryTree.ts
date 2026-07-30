import { gql } from '@generated'
import { useMemo } from 'react'
import useSWR from 'swr'

import { request } from 'src/sdk/graphql/request'

import {
  buildCategoryTree,
  type CategoryNode,
  type FlatCollection,
} from './buildCategoryTree'

type CollectionEdge = {
  node: {
    id: string
    slug: string
    type: string
    seo: {
      title: string
    }
  }
}

type AllCollectionsQuery = {
  allCollections: {
    edges: CollectionEdge[]
    pageInfo: {
      totalCount: number
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

type AllCollectionsVariables = {
  first: number
  after?: string | null
}

const query = gql(`
  query ClientAllCollectionsQuery($first: Int!, $after: String) {
    allCollections(first: $first, after: $after) {
      edges {
        node {
          id
          slug
          type
          seo {
            title
          }
        }
      }
      pageInfo {
        totalCount
        hasNextPage
        endCursor
      }
    }
  }
`)

function humanizeSlug(slug: string) {
  const leaf = slug.split('/').filter(Boolean).at(-1) ?? slug

  return leaf
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

async function fetchAllCollections(): Promise<FlatCollection[]> {
  const pageSize = 100
  let after: string | null = null
  const edges: CollectionEdge[] = []

  // allCollections returns brands first, then categories — page through everything.
  do {
    const data = await request<AllCollectionsQuery, AllCollectionsVariables>(
      query,
      {
        first: pageSize,
        after,
      }
    )

    const connection = data.allCollections
    edges.push(...(connection?.edges ?? []))

    after = connection?.pageInfo?.hasNextPage
      ? connection.pageInfo.endCursor
      : null
  } while (after)

  return edges.map(({ node }) => ({
    id: node.id,
    slug: node.slug,
    type: node.type,
    name: node.seo?.title?.trim() || humanizeSlug(node.slug),
  }))
}

export function useCategoryTree() {
  const { data, error, isValidating } = useSWR(
    'mega-menu::all-collections',
    fetchAllCollections,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  )

  const tree = useMemo<CategoryNode[]>(
    () => buildCategoryTree(data ?? []),
    [data]
  )

  return {
    tree,
    error,
    loading: !data && isValidating,
  }
}
