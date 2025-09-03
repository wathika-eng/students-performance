import { Account, Client, Databases } from "react-native-appwrite";

const projectID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const projectName = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;

if (!projectID || !projectName || !endpoint) {
  throw new Error(
    "❌ Missing Appwrite configuration in .env. " +
      "Please set EXPO_PUBLIC_APPWRITE_PROJECT_ID, " +
      "EXPO_PUBLIC_APPWRITE_PROJECT_NAME, and EXPO_PUBLIC_APPWRITE_ENDPOINT."
  );
}

// init
export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectID)
  .setPlatform(projectName);

// auth service
export const account = new Account(client);

// db service
export const db = new Databases(client);
