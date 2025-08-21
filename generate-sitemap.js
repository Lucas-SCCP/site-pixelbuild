const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')
const path = require('path')

const routes = [
  {
    url: '/',
    changefreq: 'yearly',
    priority: 1.0,
  },
]

;(async () => {
  const sitemapStream = new SitemapStream({ hostname: 'https://template.nois.dev.br' })
  const writeStream = createWriteStream(path.resolve(__dirname, './public/sitemap.xml'))

  sitemapStream.pipe(writeStream)

  routes.forEach((route) => sitemapStream.write(route))
  sitemapStream.end()
  await streamToPromise(sitemapStream)
  console.log('Sitemap gerado com sucesso.')
})()
