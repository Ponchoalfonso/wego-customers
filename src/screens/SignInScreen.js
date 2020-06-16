import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { AuthContext } from '../components/Routes'
import styles from '../styles';

const SignInScreen = ({ navigation }) => {
  const { signIn, apiClient } = useContext(AuthContext);
  useEffect(() => {

  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = () => {
    const form = { user: { email, password, } }
    signIn(form).catch(e => console.log(e));
  }
  return (
    <View style={styles.canvas}>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={require('../images/wego-slogan.png')} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.card}>
          <View style={styles.form}>
            <View style={{ ...styles.field, marginBottom: 12 }}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputbox}>
                <TextInput
                  defaultValue=''
                  styles={styles.input}
                  placeholder='example@domain.com'
                  defaultValue={email}
                  onChangeText={text => setEmail(text)} />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputbox}>
                <TextInput
                  defaultValue=''
                  styles={styles.input}
                  secureTextEntry={true}
                  defaultValue={password}
                  onChangeText={text => setPassword(text)} />
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <TouchableOpacity onPress={submitForm} style={styles.bigButton}>
                <Text style={styles.bigButtonText}>Sign In</Text>
              </TouchableOpacity>
              <Text>Or</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }} style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignInScreen;
