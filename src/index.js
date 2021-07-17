// Import the required packages
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const postman = require("./utils/postman");
const { response } = require("express");

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

// Setup static file's directory to serve
app.use(express.static(publicDirectoryPath));

/*
    Define a URL that navigates the browser to the home screen of the web app.
    The home screen is the index handlebar file
*/
app.get("", (req, res) => {
    res.render("index", {
        title: "TDS Task 1",
    });
});

/*
    Define an endpoint that shows the raw response that is received from the postman api.
    This endpoint is a middleware that gets the response from invoking the postman api and
    send that to the browser.
*/
app.get("/raw_response", async (_, res) => {
    // We need to await for the promise to resolve or reject
    const response = await postman();
    res.send({ response });
});

/*
    Define a URL that shows the prettified response that is received from the postman api.
    This endpoint renders a new handlebar in the browser. The rendered screen receives the url,
    args, and headers from the postman response and show them in a table format.
*/
app.get("/pretty_response", async (_, res) => {
    // We need to await for the promise to resolve or reject
    const response = await postman();
    res.render("pretty_response", {
        title: "Pretty response",
        url: response.url,
        args: response.args,
        headers: response.headers,
    });
});

// For all the other URLs, show a 404 error page
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
    });
});

// Start express server to listen to the port for any incoming connections
app.listen(port, () => {
    console.log("Server is up and running on port " + port);
})