// globals.d.ts
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: any;
      redisClient: any;
    }
  }
}
