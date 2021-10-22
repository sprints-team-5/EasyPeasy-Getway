import { CustomServer } from "./Core/CustomeServer";
import { BodyParserMiddleware } from "./Middlewares/BodyParserMiddleware";
import { HomeRouter } from "./Routes/HomeRouter";
import { TransactionsRouter } from "./Routes/TransactionsRouter";

/**
 * init server
 */
const app = new CustomServer();
/**
 *  user middleware
 */
app.middleware(new BodyParserMiddleware());
/**
 * init routes
 */
app.route(new HomeRouter());
app.route(new TransactionsRouter());
/**
 * start application
 */
const PORT = 3333;
app.listen(PORT);
