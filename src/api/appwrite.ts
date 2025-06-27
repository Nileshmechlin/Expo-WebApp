import { Client, Account, Databases, ID, Storage, Permission, Role } from "react-native-appwrite";

// Validate environment variables
const validateAppwriteConfig = () => {
  const requiredVars = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  };

  console.log('🔧 Appwrite Config Check:', {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ? '✅ Set' : '❌ Missing',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ? '✅ Set' : '❌ Missing',
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM ? '✅ Set' : '❌ Missing',
  });

  const missingVars = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing Appwrite environment variables: ${missingVars.join(', ')}`);
  }
};

// Validate config before creating client
validateAppwriteConfig();

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

console.log('🔧 Appwrite Client initialized successfully');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID, Permission, Role };
