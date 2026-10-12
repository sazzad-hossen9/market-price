import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoDB connection
const mongoUri = (process.env.BETTER_AUTH_MONGODB_URI || process.env.MONGODB_URI || "").trim();
const client = new MongoClient(mongoUri);
const db = client.db("market-price");

const appUrl = (process.env.BETTER_AUTH_URL || "http://localhost:3000").trim();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: appUrl,
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    appUrl,
  ].filter(Boolean),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: (process.env.BETTER_AUTH_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "").trim(),
      clientSecret: (process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || "").trim(),
    },
    github: {
      clientId: (process.env.BETTER_AUTH_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID || "").trim(),
      clientSecret: (
        process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET ||
        process.env.BETTER_AUTH_GITHUB_CLIENT_SECRE ||
        process.env.GITHUB_CLIENT_SECRET ||
        ""
      ).trim(),
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
