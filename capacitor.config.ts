
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b034827a44a843eab7ea200c1e550fa6',
  appName: 'compound-gain-calculator-pro',
  webDir: 'dist',
  server: {
    url: 'https://b034827a-44a8-43ea-b7ea-200c1e550fa6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
