import withCustomMavenMirror from './.expo/plugin-hooks/prebuild-maven-fix';

export default {
  expo: {
    name: "my-expo-app",
    slug: "my-expo-app",
    version: "1.0.0",
    // plugins: [withCustomMavenMirror], // Disabled due to prebuild error
    android: {
      package: "com.nileshvijay.myexpoapp"
    },
    extra: {
      eas: {
        projectId: "dc5b7c41-d3d2-42a7-8953-2ec8b670f82b"
      }
    }
  }
};
