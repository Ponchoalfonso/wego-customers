import 'react-native-gesture-handler';

import React, { useReducer, useEffect, useContext, createContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import WegoApiClient from '../api-client';

import SplashLoadScreen from '../screens/SplashLoadScreen';
import SigInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

export const AuthContext = createContext();
const client = new WegoApiClient('https://togetherwego.herokuapp.com/', 'Customers');

const Stack = createStackNavigator();
function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='SignIn' component={SigInScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function AppNavigator() {
  const { signOut } = useContext(AuthContext);
  return (
    <Drawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() => { signOut().catch(err => console.log(err)) }} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name='Home' component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const Routes = () => {

  function reducer(prevState, action) {
    switch (action.type) {
      case 'restoreToken':
        return {
          ...prevState,
          tokenAvailable: action.token,
          isLoading: false,
        };
      case 'signIn':
        return {
          ...prevState,
          isSignout: false,
          tokenAvailable: action.token,
        };
      case 'signOut':
        return {
          ...prevState,
          isSignout: true,
          tokenAvailable: false,
        };
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    tokenAvailable: false,
  });

  useEffect(() => {
    const refreshSession = async () => {
      await client.refreshToken();
      dispatch({ type: 'restoreToken', token: client.tokenLoaded });
    }

    if (!state.tokenAvailable)
      refreshSession();
  });

  const authContext = React.useMemo(
    () => ({
      apiClient: client,
      signIn: async user => {
        await client.signIn(user);
        dispatch({ type: 'signIn', token: client.tokenLoaded });
      },
      signOut: async () => {
        await client.signOut();
        dispatch({ type: 'signOut' })
      },
      signUp: async user => {
        await client.signUp();
        dispatch({ type: 'signUp', token: client.tokenLoaded });
      },
    })
  );

  if (state.isLoading)
    return <SplashLoadScreen />

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.tokenAvailable ? (<AppNavigator />) : (<AuthNavigator />)}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default Routes;