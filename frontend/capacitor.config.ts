import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'El Mandado',
  webDir: 'www',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DEFAULT',
      backgroundColor: '#f6f6f0',
    },
  },
};

export default config;
