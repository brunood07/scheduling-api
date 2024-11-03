import ExpressAdapter from "./infra/http/server/express-adapter";

const httpServer = new ExpressAdapter();
httpServer.listen();