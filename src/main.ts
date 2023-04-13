import 'reflect-metadata';
import path from 'node:path';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

const { PORT } = process.env;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, './graphql/schema/**/resolvers/*.resolver.ts')],
    emitSchemaFile: path.resolve(__dirname, '../schema.gql'),
    validate: {
      forbidUnknownValues: false,
    },
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);

  // eslint-disable-next-line no-console
  console.info(`Server running on ${url}`);
}

bootstrap();
