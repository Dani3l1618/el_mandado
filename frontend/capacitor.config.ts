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
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 5,
      backgroundColor: '#fcf3a9ff',
    },
  },
  cordova: {
    preferences: {
      LottieFullScreen: 'true',
      LottieHideAfterAnimationEnd: 'true',
      LottieAnimationLocation: 'public/assets/splashscreen.json',
      LottieBackgroundColor: '#FEE6ABff',
      LottieBackgroundColorLight: '#FEE6ABff',
      LottieBackgroundColorDark: '#FEE6ABff',
      LottieScaleType: 'FIT_CENTER',
      LottieFadeOutDuration: '500',
    },
  },
};

export default config;
