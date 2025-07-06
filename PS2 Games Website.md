# PS2 Games Website

A fully functional website for managing PlayStation 2 games with admin functionality.

## Features

- **User Interface**: Browse and download PS2 games
- **Admin Panel**: Add, edit, and delete games
- **RESTful API**: Backend API for game management
- **Responsive Design**: Works on desktop and mobile devices

## Files Structure

- `server.js` - Node.js/Express backend server
- `games.json` - JSON database for storing game data
- `package.json` - Node.js dependencies
- `public/` - Frontend files
  - `index.html` - Homepage
  - `ps2-games.html` - Games listing page
  - `admin.html` - Admin panel for managing games
  - `style.css` - Styling for all pages

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   - Homepage: http://localhost:3000
   - Games List: http://localhost:3000/ps2-games.html
   - Admin Panel: http://localhost:3000/admin.html

## Admin Functions

### Add New Game
1. Go to the Admin panel
2. Fill in the "Add New Game" form with:
   - Title
   - Genre
   - Release Year
   - Download Link
3. Click "Add Game"

### Edit Game
1. Find the game ID from the "Current Games" section
2. Fill in the "Edit Game" form with the Game ID and new information
3. Click "Update Game"

### Delete Game
1. Find the game ID from the "Current Games" section
2. Enter the Game ID in the "Delete Game" form
3. Click "Delete Game"

## API Endpoints

- `GET /api/games` - Get all games
- `POST /api/games` - Add a new game
- `PUT /api/games/:id` - Update a game
- `DELETE /api/games/:id` - Delete a game

## Testing

The website has been tested and verified to work correctly:
- ✅ Games display properly on the main games page
- ✅ Admin panel can add new games
- ✅ Games are automatically updated in the JSON file
- ✅ All CRUD operations work correctly
- ✅ Responsive design works on different screen sizes

