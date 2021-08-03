import glob from 'glob'
import environmentConfiguration from './config'

let files = glob.sync('**/*.md', { cwd: 'articles' })
files = files.map(file => file.substr(0, file.lastIndexOf('.')))

module.exports = {
  /*
  * Configuration
  */
  env: environmentConfiguration,
  /*
  ** Headers of the page
  */
  head: {
    title: `${environmentConfiguration.siteName}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui' },
      { hid: 'description', name: 'description', content: process.env.SITE_DESCRIPTION }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  generate: {
    routes: files
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      
      const hljs = require('highlight.js');
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          markdownIt: {
            langPrefix: 'language-',
            highlight: function (str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(lang, str).value;
                } catch (__) {}
              }
              return '';
            }
          }
        }
      })
    }
  },
  buildModules: [
    environmentConfiguration.googleAnalyticsId ? ['@nuxtjs/google-analytics', {
      id: environmentConfiguration.googleAnalyticsId,
      debug: {
        enabled: true,
        sendHitTask: true
      }
    }] : false
  ].filter(Boolean),
  css: ['./vendor/hljs-syntax.css'],
  modules: [
      '@nuxtjs/bulma',
      '@nuxtjs/sitemap',
      '@nuxtjs/axios',
      ['nuxt-fontawesome', {
        component: 'fa'
      }]
  ],
  sitemap: {
      hostname: environmentConfiguration.siteUrl
  },
  serverMiddleware: [
    '~/api/index.js'
  ]
}

