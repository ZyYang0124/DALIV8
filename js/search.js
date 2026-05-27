let fuse;
let speciesData = [];

fetch('/index.json')
  .then(res => res.json())
  .then(data => {
    speciesData = data;

    fuse = new Fuse(speciesData, {
      keys: ['title', 'genus', 'species', 'summary'],
      threshold: 0.3,
      includeScore: true
    });
  });

const input = document.getElementById('search-input');
const resultsDiv = document.getElementById('search-results');

input.addEventListener('input', function() {

  const query = input.value.trim();

  if (query.length === 0) {
    resultsDiv.innerHTML = '';
    return;
  }

  const results = fuse.search(query);

  let html = '';

  results.slice(0, 30).forEach(result => {

    const item = result.item;

    html += `
      <div class="search-item">
        <a href="${item.permalink}">
          <strong>${item.title}</strong>
        </a>
        <div>${item.summary || ''}</div>
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
});