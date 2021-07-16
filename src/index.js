// Import the required packages
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const results = require("./utils/results");

/*
Setup the app using express and initialize the port to use. If the port is
mentioned in the env file, use that. Else use port 3000
*/
const app = express();
const port = process.env.PORT || 3000;

// Let the express parse any json responses received
app.use(express.json());

// Define paths for express configuration and set the path to express app
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "TDS Task 1",
    });
});

app.get("/result_raw", (req, res) => {
    var response;
    results().then((r) => {
        response = r;
    }).catch((e) => {
        response = e;
    }).finally(() => {
        res.render("result_raw", {
            title: "Raw result",
            data: JSON.stringify(response)
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
    });
});

// Start express server to listen to the port for any incoming connections
app.listen(port, () => {
    console.log("Server is up and running on port " + port);
})