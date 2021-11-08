import express, { Application, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';

import { sequelize } from './db';
import { schema } from './graphql/schema';

dotenv.config();

const SECRET = 'KCSA_SECRET_WEB';
const PORT = process.env.PORT || 5000;

(async () => {
  console.info('NODE ENV?');
  console.info(process.env.NODE_ENV);
  console.info('Init server');
  // Sync sequelize.
  if (process.env.NODE_ENV !== 'production') {
    console.info('Syncing database');
    await sequelize.sync();
  } else {
    console.info('Prod - Not Syncing database');
  }

  const app: Application = express();

  const RedisStore = connectRedis(session);

  // Configure redis client to store session.
  const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
  });

  redisClient.on('error', function (err) {
    console.info('Could not establish a connection with redis. ' + err);
  });

  redisClient.on('connect', function () {
    console.info('Connected to redis successfully');
  });

  // Setting session
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: 'kcsaid',
      secret: SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 90, //90 days
      },
    })
  );

  app.use(
    '/graphql',
    graphqlHTTP((req) => {
      return {
        schema: schema,
        // Turn off for prod
        graphiql: true,
        // Pass request to each query and mutation to access session.
        context: { req },
      };
    })
  );

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
  });

  app.listen(PORT, () => console.info('Server running'));
})();

// Graceful shutdown
process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  console.info('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(0);
});
