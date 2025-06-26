# stage-opdracht

Dit is mijn project voor het bedrijf Vitrion/Verbleif.

Ik heb met een beetje Chat-gpt {als ik eerlijk ben} gemaakt.

Hierbij een voledig website. en weer iets nieuws geleerd.

## Installation

om het project te openen doe het volgende.


Download de project via github
```bash
    CD Game-Project

    npm install 

    npm run dev
```
    
# FreeToGame API Gids

Dit project maakt gebruik van de [FreeToGame API](https://www.freetogame.com/api-doc), een publieke API die gegevens levert over free-to-play games op verschillende platforms en in diverse genres.

---

## Aan de Slag

Volg de onderstaande stappen om aan de slag te gaan met de FreeToGame API:

1. **Authenticatie**  
   Er is geen authenticatie vereist. Je kunt direct toegang krijgen tot alle endpoints.

2. **Basis-URL**  
   ```
   https://www.freetogame.com/api
   ```

3. **Beschikbare Endpoints**
   - `/games` — Haal een lijst op met alle free-to-play games.
   - `/game?id={game_id}` — Haal details op van een specifieke game.
   - `/games?category={category}` — Filter games op genre/categorie.
   - `/games?platform={platform}` — Filter games op platform.
   - `/games?sort-by={criteria}` — Sorteer games (op releasedatum, alfabetisch of relevantie).
   - `/filter?tag={tags}&platform={platform}` — Filter games op meerdere tags en platform.

4. **Verzoeken Versturen**  
   Je kunt `GET`-verzoeken uitvoeren met:
   - cURL  
   - Postman  
   - Browser (plak de URL rechtstreeks)  
   - JavaScript / Fetch / Axios, enz.

---

## Voorbeeld Endpoints

### 🔹 Alle Games Ophalen
```http
GET https://www.freetogame.com/api/games
```

### 🔹 Games per Platform
```http
GET https://www.freetogame.com/api/games?platform=pc
```
> Platforms: `pc`, `browser`, `all`

### 🔹 Games per Categorie/Tag
```http
GET https://www.freetogame.com/api/games?category=shooter
```
> Categorieën: `mmorpg`, `shooter`, `pvp`, `mmofps`, enz.

### 🔹 Gesorteerde Games
```http
GET https://www.freetogame.com/api/games?sort-by=alphabetical
```
> Sorteer op: `release-date`, `popularity`, `alphabetical`, `relevance`

### 🔹 Filter op Platform + Categorie + Sortering
```http
GET https://www.freetogame.com/api/games?platform=browser&category=mmorpg&sort-by=release-date
```

### 🔹 Filteren op Meerdere Tags
```http
GET https://www.freetogame.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc
```
> Je kunt ook optioneel de parameter `sort` toevoegen.

### 🔹 Gamegegevens op ID
```http
GET https://www.freetogame.com/api/game?id=452
```
