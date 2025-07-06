document.addEventListener('DOMContentLoaded', function () {
    const gameList = document.getElementById('gameList');
    let games = JSON.parse(localStorage.getItem('ps2games') || '[]');

    function renderGames(gamesToRender) {
        gameList.innerHTML = '';
        if (gamesToRender.length === 0) {
            gameList.innerHTML = '<p style="text-align:center;color:#888;">No games found.</p>';
            return;
        }
        gamesToRender.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <a class="game-title" href="game.html?slug=${game.slug}">${game.title}</a>
                <div class="game-desc">${game.description || ''}</div>
                <a class="single-link" href="game.html?slug=${game.slug}">View Details</a>
            `;
            gameList.appendChild(card);
        });
    }

    renderGames(games);

    // Integrar com busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.toLowerCase();
            const filtered = games.filter(game =>
                game.title.toLowerCase().includes(query) ||
                (game.description && game.description.toLowerCase().includes(query))
            );
            renderGames(filtered);
        });
    }
});