import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.oemahmangliadmin',
  appName: 'oemah mangli admin',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
  android: {
    allowMixedContent: true 
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
  }
};

export default config;
