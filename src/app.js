import express from "express";
import "dotenv/config";
import * as path from "path";

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('src/views/index.html'))
});

app.listen(process.env.PORT, () => {
    console.log(`Application is live on http://localhost:${process.env.PORT}`);
});
