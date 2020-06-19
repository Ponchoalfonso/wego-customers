import React, { useContext } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { Card, TextField, CustomButton } from '../components/Elements';

import { AuthContext } from '../components/Routes'
import styles from '../styles';

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  const submitForm = async (values, { setSubmitting, resetForm }) => {
    const form = { user: values }
    setSubmitting(true);
    try {
      const response = await signIn(form);
      if (response.status == 401)
        Alert.alert('Sign in failed', 'Email or password is incorrect!');
    } catch (error) {
      console.log(error);
    }
    resetForm();
    setSubmitting(false);
  }

  return (
    <View style={styles.canvas}>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={require('../images/wego-slogan.png')} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={submitForm}
          >
            {(formikprops) => (
              <View style={styles.form}>
                <TextField
                  label='email'
                  labelText='Email'
                  values={formikprops.values}
                  handleChange={formikprops.handleChange}
                  placeholder='example@domain.com'
                />
                <TextField
                  label='password'
                  labelText='Password'
                  password={true}
                  values={formikprops.values}
                  handleChange={formikprops.handleChange}
                />
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                  <CustomButton
                    submitting={formikprops.isSubmitting}
                    text='Sign In'
                    handlePress={formikprops.handleSubmit}
                  />
                  <Text>Or</Text>
                  <CustomButton
                    size='small'
                    text='Sign Up'
                    handlePress={() => navigation.navigate('SignUp')}
                    submitting={formikprops.isSubmitting}
                  />
                </View>
              </View>
            )}
          </Formik>
        </Card>
      </View>
    </View>
  );
}

export default SignInScreen;
