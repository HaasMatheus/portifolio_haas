const cacheName = "portfolio-v1"
const files = [
  '/portifolio_haas/',
  '/portifolio_haas/index.html',
  '/portifolio_haas/projeto1.html',
  '/portifolio_haas/projeto1.html',
  '/portifolio_haas/projeto3.html',
  '/portifolio_haas/projeto4.html',
  '/portifolio_haas/projeto5.html',
  '/portifolio_haas/projeto6.html',
  '/portifolio_haas/stilo.css',
  '/portifolio_haas/projetos.css',
  '/portifolio_haas/quiz.css',
  '/portifolio_haas/questoes.js',
  '/portifolio_haas/quiz.js',
  '/portifolio_haas/favicon.png',
  'https://code.jquery.com/jquery-3.2.1.slim.min.js',
  'https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js',
  'https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
  'https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css',
]

self.addEventListener('install',  function(evt){
  evt.waitUntil(
    caches.open(cacheName).then(function(cache){
    cache.addAll(files)
    console.log('colocando arquuivoas no cache')
    })
  )

})

self.addEventListener('activate', function(evt){
  console.log("activate sw")
})

self.addEventListener('fetch', function(evt){
  console.log("fetch sw")
})
