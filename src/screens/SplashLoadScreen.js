import React from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

const SplashLoadScreen = () => {
  return (
    <View style={styles.canvas}>
      <Image style={styles.logo} source={require('../images/wego-slogan.png')} />
      <ActivityIndicator size='large' color='white' />
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

export default SplashLoadScreen;
