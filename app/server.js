const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const dist = __dirname + '/dist';


if (fs.existsSync(dist)) {
    app.use(express.static(dist));
} else {
    app.get('/', (req, res) => res.send('App non buildée — lancer `npm run build`'));
}


app.listen(port, () => console.log(`Demo app listening on ${port}`));