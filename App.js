import 'react-native-gesture-handler';
import React, { useState, useMemo } from 'react';

import Routes from './src/components/Routes';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const [splashTimedOut, setSplashTimedOut] = useState(false);

  useMemo(() => {
    setTimeout(() => setSplashTimedOut(true), 2 * 1000);
  }, [splashTimedOut]);

  return splashTimedOut ? (<Routes />) : (<SplashScreen />);
}

export default App;