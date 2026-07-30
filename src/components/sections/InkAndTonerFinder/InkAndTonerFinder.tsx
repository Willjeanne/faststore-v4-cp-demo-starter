import { useMemo, useState } from 'react'

import Link from 'src/components/ui/Link'
import { useSearchBase } from 'src/sdk/search/useSearchBase'

import {
  buildInkTonerSearchUrl,
  buildSpecificationFacets,
  buildSpecificationSearchTerm,
} from './buildInkTonerSearchUrl'
import {
  DEFAULT_MANUFACTURERS,
  type InkTonerManufacturer,
} from './defaultManufacturers'
import styles from './ink-and-toner-finder.module.scss'

export type InkAndTonerFinderProps = {
  title?: string
  selectSectionTitle?: string
  searchSectionTitle?: string
  manufacturerLabel?: string
  productLineLabel?: string
  modelLabel?: string
  manufacturerPlaceholder?: string
  productLinePlaceholder?: string
  modelPlaceholder?: string
  searchPlaceholder?: string
  searchButtonLabel?: string
  dividerLabel?: string
  footerText?: string
  customerServiceLink?: {
    url?: string
    text?: string
  }
  manufacturerFacetKey?: string
  productLineFacetKey?: string
  modelFacetKey?: string
  manufacturers?: InkTonerManufacturer[]
}

const EMPTY_VALUE = ''

function InkAndTonerFinder({
  title = 'Ink & Toner Finder',
  selectSectionTitle = 'Select by Printer Brand & Model',
  searchSectionTitle = 'Search by Printer Model',
  manufacturerLabel = 'Printer manufacturer',
  productLineLabel = 'Product Line',
  modelLabel = 'Model',
  manufacturerPlaceholder = 'Select manufacturer',
  productLinePlaceholder = 'Select product line',
  modelPlaceholder = 'Select model',
  searchPlaceholder = 'Enter the printer model. Ex.: M455dn, C230',
  searchButtonLabel = 'Search',
  dividerLabel = 'or',
  footerText = "If you can't find what you're looking for, please contact",
  customerServiceLink = {
    url: '/support',
    text: 'customer service',
  },
  manufacturerFacetKey,
  productLineFacetKey,
  modelFacetKey,
  manufacturers,
}: InkAndTonerFinderProps) {
  const searchBase = useSearchBase()

  const [manufacturerValue, setManufacturerValue] = useState(EMPTY_VALUE)
  const [productLineValue, setProductLineValue] = useState(EMPTY_VALUE)
  const [modelValue, setModelValue] = useState(EMPTY_VALUE)
  const [modelQuery, setModelQuery] = useState('')

  const manufacturerOptions = useMemo(() => {
    const list = manufacturers?.length ? manufacturers : DEFAULT_MANUFACTURERS

    return list.filter((item) => item.productLines?.length)
  }, [manufacturers])

  const selectedManufacturer = useMemo(
    () =>
      manufacturerOptions.find((item) => item.value === manufacturerValue),
    [manufacturerOptions, manufacturerValue]
  )

  const productLineOptions = selectedManufacturer?.productLines ?? []

  const selectedProductLine = useMemo(
    () => productLineOptions.find((item) => item.value === productLineValue),
    [productLineOptions, productLineValue]
  )

  const modelOptions = selectedProductLine?.models ?? []

  const selectedModel = useMemo(
    () => modelOptions.find((item) => item.value === modelValue),
    [modelOptions, modelValue]
  )

  const buildSearchHref = ({
    manufacturer,
    productLine,
    model,
    query,
  }: {
    manufacturer?: typeof selectedManufacturer
    productLine?: typeof selectedProductLine
    model?: typeof selectedModel
    query?: string
  }) => {
    const term = buildSpecificationSearchTerm({
      manufacturerLabel: manufacturer?.label,
      productLineLabel: productLine?.label,
      modelLabel: model?.label,
      modelQuery: query,
    })

    const facets = buildSpecificationFacets({
      manufacturerFacetKey,
      manufacturerValue: manufacturer?.value,
      productLineFacetKey,
      productLineValue: productLine?.value,
      modelFacetKey,
      modelValue: model?.value,
    })

    return buildInkTonerSearchUrl({
      term,
      base: searchBase,
      facets,
    })
  }

  const handleManufacturerChange = (value: string) => {
    setManufacturerValue(value)
    setProductLineValue(EMPTY_VALUE)
    setModelValue(EMPTY_VALUE)
  }

  const handleProductLineChange = (value: string) => {
    setProductLineValue(value)
    setModelValue(EMPTY_VALUE)
  }

  const selectedModelHref =
    selectedManufacturer && selectedProductLine && selectedModel
      ? buildSearchHref({
          manufacturer: selectedManufacturer,
          productLine: selectedProductLine,
          model: selectedModel,
        })
      : null

  const modelQueryHref = modelQuery.trim()
    ? buildSearchHref({ query: modelQuery })
    : null

  return (
    <section className={`section ${styles.inkAndTonerFinder}`}>
      <div className={`${styles.container} layout__content`}>
        <div className={styles.card}>
          <header className={styles.header}>
            <span className={styles.headerIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M9 3h6a2 2 0 0 1 2 2v2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1V5a2 2 0 0 1 2-2Zm6 4V5h-6v2h6ZM6 9v10h12V9H6Zm3 2h6v2H9v-2Zm0 4h4v2H9v-2Z" />
              </svg>
            </span>
            <h2 className={styles.title}>{title}</h2>
          </header>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{selectSectionTitle}</h3>

            <div className={styles.selectGrid}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{manufacturerLabel}</span>
                <select
                  className={styles.select}
                  value={manufacturerValue}
                  onChange={(event) =>
                    handleManufacturerChange(event.target.value)
                  }
                >
                  <option value={EMPTY_VALUE}>{manufacturerPlaceholder}</option>
                  {manufacturerOptions.map((manufacturer) => (
                    <option key={manufacturer.value} value={manufacturer.value}>
                      {manufacturer.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>{productLineLabel}</span>
                <select
                  className={styles.select}
                  value={productLineValue}
                  disabled={!manufacturerValue}
                  onChange={(event) =>
                    handleProductLineChange(event.target.value)
                  }
                >
                  <option value={EMPTY_VALUE}>{productLinePlaceholder}</option>
                  {productLineOptions.map((productLine) => (
                    <option key={productLine.value} value={productLine.value}>
                      {productLine.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>{modelLabel}</span>
                <select
                  className={styles.select}
                  value={modelValue}
                  disabled={!productLineValue}
                  onChange={(event) => setModelValue(event.target.value)}
                >
                  <option value={EMPTY_VALUE}>{modelPlaceholder}</option>
                  {modelOptions.map((model) => (
                    <option key={model.value} value={model.value}>
                      {model.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedModelHref ? (
              <Link href={selectedModelHref} className={styles.searchButton}>
                {searchButtonLabel}
              </Link>
            ) : (
              <button className={styles.searchButton} type="button" disabled>
                {searchButtonLabel}
              </button>
            )}
          </div>

          <div className={styles.divider} aria-hidden="true">
            <span>{dividerLabel}</span>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{searchSectionTitle}</h3>

            <div className={styles.searchForm}>
              <label className={styles.searchField}>
                <span className="visually-hidden">{searchSectionTitle}</span>
                <input
                  className={styles.input}
                  type="search"
                  value={modelQuery}
                  placeholder={searchPlaceholder}
                  onChange={(event) => setModelQuery(event.target.value)}
                />
              </label>

              {modelQueryHref ? (
                <Link href={modelQueryHref} className={styles.searchButton}>
                  {searchButtonLabel}
                </Link>
              ) : (
                <button className={styles.searchButton} type="button" disabled>
                  {searchButtonLabel}
                </button>
              )}
            </div>
          </div>

          <p className={styles.footer}>
            {footerText}{' '}
            {customerServiceLink?.url && customerServiceLink?.text ? (
              <Link href={customerServiceLink.url}>
                {customerServiceLink.text}
              </Link>
            ) : null}
            .
          </p>
        </div>
      </div>
    </section>
  )
}

InkAndTonerFinder.$componentKey = 'InkAndTonerFinder'

export default InkAndTonerFinder
