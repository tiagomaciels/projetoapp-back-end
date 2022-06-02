import "reflect-metadata";
import express from "express";
import "./database";

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => console.log(`The server is running on port ${port}`));
