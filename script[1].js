
async function fetchData() {
  const res = await fetch('data/rtp.json');
  const data = await res.json();
  window.allGames = data;
  renderGames(data);
}

function renderGames(games) {
  const container = document.getElementById('gameContainer');
  container.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';
    const fillColor = game.rtp >= 70 ? 'limegreen' : game.rtp >= 50 ? 'gold' : 'red';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h4>${game.name}</h4>
      <div class="rtp-bar"><div class="rtp-fill" style="width:${game.rtp}%; background:${fillColor};"></div></div>
      <small>${game.rtp}%</small>
    `;
    container.appendChild(card);
  });
}

function filterCategory(cat) {
  const filtered = window.allGames.filter(g => g.category === cat);
  renderGames(filtered);
}

function searchGame() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = window.allGames.filter(g => g.name.toLowerCase().includes(query));
  renderGames(filtered);
}

fetchData();
