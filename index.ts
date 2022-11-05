import Express from "express";
import { resolve } from 'path';

const app = Express()
app.use(Express.static('public'))

// Server routes
app.get('/', (req, res) => {res.sendFile(resolve("public/index.html"))})

app.listen(8080, () => {console.log('Server listening on port 8080')})