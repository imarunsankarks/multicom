const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./docs/swagger");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(routes);

app.use(notFound);
app.use(errorHandler); // always last

module.exports = app;
