
module.exports = {
  seo: {
    title: 'FastStore Demo Starter',
    description:
      'Reusable FastStore v4 storefront starter for VTEX Content Platform demos.',
    titleTemplate: '%s | FastStore Demo Starter',
    author: 'William Jeanne',
  },

  // Theming
  theme: 'custom-theme',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: process.env.NEXT_PUBLIC_STORE_ID || 'starter',
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
    incrementAddress: false,
  },

  // Default session
  session: {
    currency: {
      code: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'USD',
      symbol: "$",
    },
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-US',
    channel: `{"salesChannel":${process.env.NEXT_PUBLIC_DEFAULT_SALES_CHANNEL || 1},"regionId":""}`,
    country: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || 'USA',
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },

  cart: {
    id: '',
    items: [],
    messages: [],
    shouldSplitItem: true,
  },

  // Production URLs
  storeUrl: process.env.STORE_URL || 'http://localhost:3000',
  secureSubdomain:
    process.env.SECURE_SUBDOMAIN || process.env.STORE_URL || 'http://localhost:3000',
  checkoutUrl:
    process.env.CHECKOUT_URL ||
    `${process.env.STORE_URL || 'http://localhost:3000'}/checkout`,
  loginUrl:
    process.env.LOGIN_URL ||
    `${process.env.STORE_URL || 'http://localhost:3000'}/api/io/login`,
  accountUrl:
    process.env.ACCOUNT_URL ||
    `${process.env.STORE_URL || 'http://localhost:3000'}/api/io/account`,

  previewRedirects: {
    home: '/',
    plp: '/electronics',
    search: '/s?q=demo',
    pdp: '/mouse/p',
  },

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: '/mouse/p',
      collection: '/electronics',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/mouse/p',
      collection: '/electronics',
      collection_filtered:
        '/electronics/?category-1=electronics&marca=faststore&facets=category-1%2Cmarca%27',
      search: '/s?q=demo',
    },
    browser: 'electron',
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    gtmContainerId: "",
  },

  experimental: {
    nodeVersion: 24,
    cypressVersion: 12,
  },

  contentSource: {
    type: 'CP',
    project:
      process.env.CONTENT_PROJECT ||
      process.env.NEXT_PUBLIC_STORE_ID ||
      'starter',
  },

  localization: {
    enabled: true,
  },
}
