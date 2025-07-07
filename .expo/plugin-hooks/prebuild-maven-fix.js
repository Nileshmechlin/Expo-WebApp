module.exports = function withCustomMavenMirror(config) {
    return {
      ...config,
      mods: {
        ...config.mods,
        android: {
          ...config.mods?.android,
          projectBuildGradle: async (config, mod) => {
            const fallbackRepo = `maven { url 'https://maven-central.storage-download.googleapis.com/maven2/' }`;
  
            mod.modResults.contents = mod.modResults.contents.replace(
              /allprojects\s*{[\s\S]*?repositories\s*{([\s\S]*?)}/,
              match => {
                if (match.includes('maven-central.storage-download')) return match;
                return match.replace(
                  /repositories\s*{([\s\S]*?)}/,
                  `repositories {\n${fallbackRepo}\n$1\n}`
                );
              }
            );
  
            return mod;
          },
        },
      },
    };
  };
  