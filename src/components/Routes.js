import 'react-native-gesture-handler';

import React, { useReducer, useEffect, useContext, createContext, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import WegoApiClient from '../api-client';

import SplashLoadScreen from '../screens/SplashLoadScreen';
import SigInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

import { Card } from '../components/Elements';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

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
  const { signOut, apiClient } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!profile)
      apiClient.getProfile().then(res => setProfile(res.body.profile));
    else
      console.log(apiClient.url + profile.picutre_url);
  });

  return (
    <Drawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1, paddingVertical: 0 }} {...props}>
          <Card color='#6D5DBA' noMargin={true} shadow={true}>
            {profile && (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 }}>
                <Avatar
                  medium
                  rounded
                  source={{ uri: apiClient.url + profile.picutre_url }}
                  activeOpacity={0.7}
                />
                <Text>Hello! {profile.name}</Text>
              </View>
            )}
          </Card>
          <View style={{ flex: 1, flexDirection: 'column' }} >
            <DrawerItemList style={{ flex: 2 }} {...props} />
            <DrawerItem style={{ marginTop: 'auto' }} label="Log out" onPress={() => { signOut().catch(err => console.log(err)) }} />
          </View>
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
      const res = await client.refreshToken();
      dispatch({ type: 'restoreToken', token: client.tokenLoaded });

    }

    if (!state.tokenAvailable)
      refreshSession();
  });

  const authContext = React.useMemo(
    () => ({
      apiClient: client,
      signIn: async user => {
        const res = await client.signIn(user);
        dispatch({ type: 'signIn', token: client.tokenLoaded });
        return new Promise(resolve => resolve(res));
      },
      signOut: async () => {
        await client.signOut();
        dispatch({ type: 'signOut' })
      },
      signUp: async user => {
        const res = await client.signUp(user);
        dispatch({ type: 'signIn', token: client.tokenLoaded });
        return new Promise(resolve => resolve(res));
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