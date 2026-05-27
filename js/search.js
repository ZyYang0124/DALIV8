let fuse;
let speciesData = [];

// 1. 使用相对路径确保无论在哪都能找到 index.json
// 如果你的搜索页在根目录，使用 './index.json'
// 如果在子目录，使用 '../index.json'，这里使用相对于网站根目录的路径
fetch(window.location.origin + '/DALIV8/index.json') 
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

  if (query.length === 0 || !fuse) {
    resultsDiv.innerHTML = '';
    return;
  }

  const results = fuse.search(query);

  let html = '';

  results.slice(0, 30).forEach(result => {
    const item = result.item;

    // 2. 确保 permalink 包含正确的二级目录前缀
    // 如果 JSON 里的 permalink 已经带了 /DALIV8/，这里直接用；
    // 如果没有，请使用: href="${window.location.origin + '/DALIV8' + item.permalink}"
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