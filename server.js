
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Get all games
app.get('/api/games', (req, res) => {
  const gamesPath = path.join(__dirname, 'games.json');
  let games = [];
  if (fs.existsSync(gamesPath)) {
    try {
      games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    } catch (e) {
      games = [];
    }
  }
  res.json(games);
});

// Add a game
app.post('/api/games', (req, res) => {
  const gamesPath = path.join(__dirname, 'games.json');
  let games = [];
  if (fs.existsSync(gamesPath)) {
    try {
      games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    } catch (e) {
      games = [];
    }
  }
  games.push(req.body);
  fs.writeFileSync(gamesPath, JSON.stringify(games, null, 2));
  res.json({ success: true });
});

// Edit a game
app.put('/api/games/:slug', (req, res) => {
  const gamesPath = path.join(__dirname, 'games.json');
  let games = [];
  if (fs.existsSync(gamesPath)) {
    try {
      games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    } catch (e) {
      games = [];
    }
  }
  games = games.map(g => g.slug === req.params.slug ? req.body : g);
  fs.writeFileSync(gamesPath, JSON.stringify(games, null, 2));
  res.json({ success: true });
});

// Delete a game
app.delete('/api/games/:slug', (req, res) => {
  const gamesPath = path.join(__dirname, 'games.json');
  let games = [];
  if (fs.existsSync(gamesPath)) {
    try {
      games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    } catch (e) {
      games = [];
    }
  }
  games = games.filter(g => g.slug !== req.params.slug);
  fs.writeFileSync(gamesPath, JSON.stringify(games, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
