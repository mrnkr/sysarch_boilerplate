import { MongoMemoryServer } from 'mongodb-memory-server';
import db from 'mongoose';

let mongod;
let mocked = 0;

export async function spinupMongoMock() {
  mocked++;

  if (mocked === 1) {
    mongod = new MongoMemoryServer();
    await db.connect(await mongod.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export async function teardownMongoMock() {
  mocked--;
  if (mocked === 0) {
    await db.disconnect();
    await mongod.stop();
  }
}
