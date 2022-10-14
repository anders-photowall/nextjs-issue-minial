const pwConfig = require('./pw.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.photowall.com'],
  },
  i18n: {
    locales: ['default'].concat(pwConfig.i18n.sitePathPrefixes),
    defaultLocale: 'default',
    // locales: pwConfig.i18n.sitePathPrefixes,
    // defaultLocale: "us",
    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain: 'www.photowall-local.com',
        defaultLocale: 'default',
        locales: ['default, be-nl, be-fr, it, us'],
        // defaultLocale: "us",
        // locales: ["be-nl, be-fr, it, us"],
        localeDetection: false,
      },
      {
        domain: 'www.photowall-local.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'www.photowall-local.se',
        defaultLocale: 'sv',
      },
    ],
  },
  beforeFiles: async () => {
    return [
      // Not using this rewrite, i.e. going to /product/wallpaper/:productPageSlug remove the issue
      {
        source: `/:locale/:productPageSlug((?:.+)-(?:${Object.values(
          pwConfig.i18n.languages
        )
          .map((langConf) => langConf.productPathSuffix.wallpaper)
          .join('|')})$)`,
        destination: '/:locale/product/wallpaper/:productPageSlug',
        locale: false,
      },
    ];
  },
  serverRuntimeConfig: {
    pw: pwConfig,
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
