const form = document.querySelector('#search-form');
const it = gen();

form.addEventListener('submit', function(event) {
  it.next();
  event.preventDefault();
});

// TODO Name appropriately
function *gen() {
  while (true) {  // eslint-disable-line
    document.querySelector('#search-results').innerHTML = LoadingTemplate();

    const searchTerm = document.querySelector('#search-term').value;
    const searchResults = yield fetchWikipediaPages(searchTerm);

    // TODO Refactor if possible
    document.querySelector('#search-results').innerHTML =
      groupResultDetails(searchResults)
        .map(ResultTemplate)
        .join('');

    yield;
  }
}

function ResultTemplate({title = '', excerpt = '', link = ''} = {}) {
  return `<div class="searchResults-result">
    <h2><a href="${link}" target="_blank">${title}</a></h2>
    <p>${excerpt}</p>
  </div>`;
}

function LoadingTemplate() {
  return `<div class="searchResults-loading">
    <span class="fa fa-circle-o-notch fa-spin fa-5x fa-fw" aria-hidden="true">
    </span>
  </div>`;
}

// Opensearch results group the titles, excertps and links in their own arrays.
// But their respective indexes coincide.
// Returns an array of the search results with the details grouped in their
// respective objects.
function groupResultDetails([, titles = [], excerpts = [], links = []] = []) {
  return titles.map((title, i) => ({
    title,
    excerpt: excerpts[i],
    link: links[i]
  }));
}

function fetchWikipediaPages(searchTerm = '') {
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&formatversion=2&search=${encodeURIComponent(searchTerm)}`;

  return Promise.resolve(fetch(url, {cache: 'no-cache'}))
    .then(response => {
      if (!response.ok) throw new Error('Network response was not OK');
      return response.json();
    })
    .then(json => it.next(json));
}
