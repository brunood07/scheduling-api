import ExpressAdapter from "./infra/http/express-adapter";

const httpServer = new ExpressAdapter();
httpServer.listen();