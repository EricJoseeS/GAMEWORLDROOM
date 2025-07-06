

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Admin credentials (in production, these should be in environment variables)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'ps2-games-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use(express.static(path.join(__dirname, 'public')));

const GAMES_FILE = path.join(__dirname, 'games.json');

// Helper function to read games from file
function readGames() {
    try {
        const data = fs.readFileSync(GAMES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading games.json:', error);
        return [];
    }
}

// Helper function to write games to file
function writeGames(games) {
    try {
        fs.writeFileSync(GAMES_FILE, JSON.stringify(games, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing games.json:', error);
    }
}

// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
    if (req.session && req.session.authenticated) {
        return next();
    } else {
        return res.status(401).json({ error: 'Authentication required' });
    }
}

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.authenticated = true;
        req.session.username = username;
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Logout route
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.json({ success: true, message: 'Logout successful' });
    });
});

// Check authentication status
app.get('/api/auth-status', (req, res) => {
    if (req.session && req.session.authenticated) {
        res.json({ authenticated: true, username: req.session.username });
    } else {
        res.json({ authenticated: false });
    }
});

// API to get all games
app.get('/api/games', (req, res) => {
    const games = readGames();
    res.json(games);
});

// API to add a new game (protected)
app.post('/api/games', requireAuth, (req, res) => {
    const games = readGames();
    const newGame = req.body;
    newGame.id = (games.length > 0 ? Math.max(...games.map(g => parseInt(g.id))) + 1 : 1).toString();
    games.push(newGame);
    writeGames(games);
    res.status(201).json(newGame);
});

// API to update a game (protected)
app.put('/api/games/:id', requireAuth, (req, res) => {
    const games = readGames();
    const gameId = req.params.id;
    const updatedGame = req.body;
    const index = games.findIndex(g => g.id === gameId);

    if (index !== -1) {
        games[index] = { ...games[index], ...updatedGame };
        writeGames(games);
        res.json(games[index]);
    } else {
        res.status(404).send('Game not found');
    }
});

// API to delete a game (protected)
app.delete('/api/games/:id', requireAuth, (req, res) => {
    let games = readGames();
    const gameId = req.params.id;
    const initialLength = games.length;
    games = games.filter(g => g.id !== gameId);

    if (games.length < initialLength) {
        writeGames(games);
        res.status(204).send();
    } else {
        res.status(404).send('Game not found');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});


