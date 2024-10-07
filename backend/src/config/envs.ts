import { config } from "dotenv";
import { z } from "zod";
config();

const envsSchema = z.object({
  PORT: z.coerce.number(),
  URL: z.string(),
  SEED: z.coerce.boolean(),
  DB: z.object({
    PORT: z.coerce.number(),
    HOST: z.string(),
    USER: z.string(),
    PASS: z.string(),
    NAME: z.string(),
  }),
});

export default envsSchema.parse({
  PORT: process.env.SERVER_PORT || 3000,
  URL: process.env.SERVER_URL || "http://localhost",
  SEED: process.env.SEED || false,
  DB: {
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    NAME: process.env.DB_NAME,
    PASS: process.env.DB_PASS,
  },
});
