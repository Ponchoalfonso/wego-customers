import React from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.canvas}>
      <Image style={styles.logo} source={require('../images/wego-slogan.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8774E7',
  },
  logo: {
    marginLeft: 4,
    resizeMode: 'contain',
    width: 300,
  }
});

export default SplashScreen;
