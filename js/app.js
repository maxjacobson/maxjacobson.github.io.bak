// via http://youmightnotneedjquery.com/#ready
function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

// setup search behavior
ready(function () {
  var searchBox = document.querySelectorAll('.search input')[0]
  if (!searchBox) { return }
  var list = document.querySelectorAll('.search-results ul')[0]
  if (window.location.hash) {
    searchBox.value = decodeURI(window.location.hash.slice(1))
    var li = document.createElement('li')
    li.appendChild(document.createTextNode('Loading...'))
    list.appendChild(li)
  }

  var request = new window.XMLHttpRequest()
  request.open('GET', '/searchdata.json', true)
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var posts = JSON.parse(request.responseText).posts
      var index = window.lunr(function () {
        this.ref('id')
        this.field('title', { boost: 10 })
        this.field('content')
      })
      for (var i = 0; i < posts.length; i++) {
        posts[i].id = i
        index.add(posts[i])
      }

      searchBox.oninput = function () {
        while (list.firstChild) { list.removeChild(list.firstChild) }
        window.location.hash = encodeURI(this.value)
        var results = index.search(this.value)
        results.forEach(function (result, i) {
          var post = posts[result.ref]
          var li = document.createElement('li')
          var a = document.createElement('a')
          a.setAttribute('href', post.url)
          a.appendChild(document.createTextNode(post.title))
          li.appendChild(document.createTextNode(post.date + ' — '))
          li.appendChild(a)
          list.appendChild(li)
        })
      }

      if (searchBox.value) { searchBox.oninput() }
    } else {
      window.alert('Sorry, search is broken. Feel free to let me know.')
    }
  }

  request.onerror = function () {
    window.alert('Something went wrong... Please try again in a bit.')
  }

  request.send()
})
