import express, { Application, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";

import { sequelize } from "./db";
import { schema } from "./graphql/schema";

dotenv.config();

(async () => {
  // Sync sequelize.
  await sequelize.sync();

  const app: Application = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      // Turn off for prod
      graphiql: true,
    })
  );

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
  });

  app.listen(5000, () => console.log("Server running"));
})();
