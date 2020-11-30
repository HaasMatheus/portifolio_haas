self.addEventListener('install',  function(evt){
  console.log("install sw")
})

self.addEventListener('activate', function(evt){
  console.log("activate sw")
})

self.addEventListener('fetch', function(evt){
  console.log("fetch sw")
})
