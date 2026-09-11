import express from "express";

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

const games = [];
let currId = 1;

app.use(express.json());

app.get("/games", (req, res) => {
  res.status(200).send(games);
});

app.get("/games/:id", (req, res) => {
  const gameData = games.find((g) => g.id === parseInt(req.params.id));

  if (!gameData) return res.status(404).send("No such game exists");

  res.status(200).send(gameData);
});

app.post("/games", (req, res) => {
  const { name, level } = req.body;

  const newGame = {
    id: currId++,
    name,
    level,
  };

  games.push(newGame);

  return res.status(201).send("added successfully");
});

app.put("/games/:id", (req, res) => {
  const game = games.find((g) => g.id === parseInt(req.params.id));

  if (!game) return res.status(404).send("No such game exists");

  const { name, level } = req.body;

  game.name = name;
  game.level = level;

  return res.status(201).send("Game data updated successfully!!!");
});

app.delete("/games/:id", (req, res) => {
  const gameIndex = games.findIndex((g) => g.id === parseInt(req.params.id));

  if (gameIndex === -1)
    return res.status(404).send("No game exists with this ID");

  games.splice(gameIndex, 1);

  return res.status(200).send("Successfully Deleted");
});

app.listen(port, hostname, () => {
  console.log(`Server is listening to the port-${port} and host-${hostname}`);
});
