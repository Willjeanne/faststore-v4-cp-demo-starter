import { formatSearchState, initSearchState, type Facet } from '@faststore/sdk'

type BuildInkTonerSearchUrlParams = {
  term: string
  base?: string
  facets?: Facet[]
}

export function buildInkTonerSearchUrl({
  term,
  base = '/s',
  facets = [],
}: BuildInkTonerSearchUrlParams) {
  const trimmedTerm = term.trim()

  if (!trimmedTerm && facets.length === 0) {
    return null
  }

  const { pathname, search } = formatSearchState(
    initSearchState({
      term: trimmedTerm || null,
      selectedFacets: facets,
      base,
    })
  )

  return `${pathname}${search}`
}

export function buildSpecificationFacets({
  manufacturerFacetKey,
  manufacturerValue,
  productLineFacetKey,
  productLineValue,
  modelFacetKey,
  modelValue,
}: {
  manufacturerFacetKey?: string
  manufacturerValue?: string
  productLineFacetKey?: string
  productLineValue?: string
  modelFacetKey?: string
  modelValue?: string
}): Facet[] {
  const facets: Facet[] = []

  if (manufacturerFacetKey && manufacturerValue) {
    facets.push({ key: manufacturerFacetKey, value: manufacturerValue })
  }

  if (productLineFacetKey && productLineValue) {
    facets.push({ key: productLineFacetKey, value: productLineValue })
  }

  if (modelFacetKey && modelValue) {
    facets.push({ key: modelFacetKey, value: modelValue })
  }

  return facets
}

export function buildSpecificationSearchTerm({
  manufacturerLabel,
  productLineLabel,
  modelLabel,
  modelQuery,
}: {
  manufacturerLabel?: string
  productLineLabel?: string
  modelLabel?: string
  modelQuery?: string
}) {
  if (modelQuery?.trim()) {
    return modelQuery.trim()
  }

  const parts = [manufacturerLabel, productLineLabel, modelLabel]
    .map((part) => part?.trim())
    .filter(Boolean)

  if (parts.length === 0) {
    return ''
  }

  return `${parts.join(' ')} ink toner`
}
