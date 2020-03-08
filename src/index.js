const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");
const swaggerDocs = require("./../swaggerDocs")

// Create a new express application instance
const app = express();
// Add swagger documentation


// The port the express app will listen on
const port = 3000;

logger.info("🤖 Initializing middleware");

app.use(bodyParser.json());
app.use(morgan("tiny", { stream: logger.stream }));
// Top-level router - makes it easier to version apis (seperation of concerns)
app.use("/", router);
swaggerDocs(app);
app.use(errorHandler); // app-level middleware 
// this needs to be the very last middleware that needs to be defined
// (doesn't crash whole app, when running to an error)


// Serve the application at the given port
app.listen(port, () => {
  logger.info(`🎧 Listening at http://localhost:${port}/`);
});

// TASKS:
// 1. GET community groups
// 2. POST
// - prolly want the id and req.body as a response back
// 3. VAlIDATION Middleware ~ just to one controller (other than ):
// - is done on the request body
// - validation chain api
// - validation 
// - res.send()
// - you create more custom validator
// 4. ERROR HANDLING