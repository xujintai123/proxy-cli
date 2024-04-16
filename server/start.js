const { startServerA } = require("./serverA");
const { startServerB } = require("./serverB");

const startApiServer = () => {
  startServerA();
  startServerB();
};

startApiServer();
