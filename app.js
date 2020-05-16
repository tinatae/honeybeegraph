const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello Honey Bee"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


// const bodyParser = require("body-parser");

// const path = require("path");

// const users = require("./routes/api/users");

// const hydration = require("./routes/api/hydration")


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('frontend/build'));
//     app.get('/', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     })
// };


// app.get("/", (req, res) => res.send("Hello World"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use("/api/users", users);

// app.use("/api/exercise", exercise);


// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
