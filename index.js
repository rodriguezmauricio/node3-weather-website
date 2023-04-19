const path = require("path");
const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const app = express();
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
const author = "Mauricio Rodriguez";

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// app.use(express.static(publicDir));
app.use(express.static("public"));

app.get("", (req, res) => {
    res.render("index", {
        title: "Titulo aqui",
        name: "Mauricio",
        author,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        thing: "ding, dingling",
        title: "About",
        author,
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        text: "Example Message",
        title: "Help",
        author,
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "oopsie",
            address: req.query.address,
        });
    }

    const url = "http://api.weatherstack.com/current";

    axios
        .get(url, {
            params: {
                access_key: "ac5f8fecde16fb0ae6f9994e905664b5",
                query: req.query.address,
            },
        })
        .then((response) => {
            const data = response.data.current;
            // const { temperature } = data;
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });

    // const weat = fetchWeather();
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", { errorMsg: "Sem ajuda pra você" });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMsg: "Erro 404 : Esta página tomou doril",
        author,
    });
});

app.listen(3000, () => {
    console.log("server is up on port 3000.");
});
