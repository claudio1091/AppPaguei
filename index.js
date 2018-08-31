import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import { PRIMARY, ACCENT, BACKGROUND } from './src/config/theme';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY,
    accent: ACCENT,
    background: BACKGROUND,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent('PagueiApp', () => Main);
