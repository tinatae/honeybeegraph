const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const states = require("./routes/api/states")

app.get("/", (req, res) => res.send("Hello Honey Bee"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/states", states)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));




// const path = require("path");

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('frontend/build'));
//     app.get('/', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     })
// };
