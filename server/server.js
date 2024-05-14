import React from "react";
import ReactDomServer from "react-dom/server";
import { Provider } from "react-redux";
import express from "express";
import path from "path";
import fs from "fs";

import { createStore } from "../src/redux/store";
import { fetchHotels } from "../src/redux/slice/hotelsSlice";

require("dotenv").config();
var bodyParser = require("body-parser");

const hotelRouter = require("./routes/hotels");
const searchPlaceRouter = require("./routes/searchPlaces");
const getPlaceDetail = require("./routes/getPlaceDetails");

import App from "../src/index";

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
const port = 3000;
const render = (store) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

app.use("/hotels", hotelRouter);
app.use("/searchPlace", searchPlaceRouter);
app.use("/getPlaceDetail", getPlaceDetail);

app.get("/", async (req, res) => {
  const store = createStore();
  await store.dispatch(fetchHotels());
  const preloadedState = store.getState();

  fs.readFile(path.resolve("./dist/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error ", err);
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDomServer.renderToString(render(store))}</div>
         <script>window.INITIAL_STATE = ${JSON.stringify(
           preloadedState
         )}</script>
        `
      )
    );
  });
});

app.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.listen(port, () => console.log(`app listening on port ${port}!`));
