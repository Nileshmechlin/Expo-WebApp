// Debug utility to check environment variables
export const debugConfig = () => {
  const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
    dbId: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    usersCollection: process.env.EXPO_PUBLIC_USERS_COLLECTION_ID,
    contactsCollection: process.env.EXPO_PUBLIC_CONTACTS_COLLECTION_ID,
  };

  console.log('🔧 Appwrite Configuration:');
  Object.entries(config).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
    } else {
      console.log(`❌ ${key}: NOT SET`);
    }
  });

  return config;
};

// Check if all required config is present
export const isConfigValid = (): boolean => {
  const required = [
    'EXPO_PUBLIC_APPWRITE_ENDPOINT',
    'EXPO_PUBLIC_APPWRITE_PROJECT_ID',
    'EXPO_PUBLIC_APPWRITE_PLATFORM',
    'EXPO_PUBLIC_APPWRITE_DB_ID',
    'EXPO_PUBLIC_USERS_COLLECTION_ID',
    'EXPO_PUBLIC_CONTACTS_COLLECTION_ID',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing);
    return false;
  }
  
  console.log('✅ All environment variables are set');
  return true;
}; 