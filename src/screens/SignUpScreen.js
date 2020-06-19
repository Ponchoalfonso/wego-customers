import React, { useContext } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { Card, TextField, DateField, CustomButton } from '../components/Elements';

import { AuthContext } from '../components/Routes';
import styles from '../styles';

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);

  const submitForm = async (values, { setSubmitting, resetForm }) => {
    const form = { user: values }
    setSubmitting(true);
    try {
      const response = await signUp(form);
      if (response.status > 300)
        Alert.alert('Sign up failed');
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
      <Card>
        <Formik
          initialValues={{
            name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmaton: '',
            birthday: '',
            phone_number: '',
          }}
          onSubmit={submitForm}
        >
          {(formikprops) => (
            <View style={styles.form}>
              <View style={styles.adjacentFields}>
                <TextField
                  adjacent='first'
                  style={{ marginRight: 12, flex: 1 }}
                  label='name'
                  labelText='Name'
                  annotation='First name'
                  values={formikprops.values}
                  handleChange={formikprops.handleChange}
                />
                <TextField
                  adjacent='last'
                  label='lastname'
                  labelText=''
                  annotation='Last name'
                  values={formikprops.values}
                  handleChange={formikprops.handleChange}
                />
              </View>
              <TextField
                label='email'
                labelText='Email'
                values={formikprops.values}
                handleChange={formikprops.handleChange}
              />
              <TextField
                label='password'
                labelText='Password'
                password={true}
                values={formikprops.values}
                handleChange={formikprops.handleChange}
              />
              <TextField
                label='password_confirmation'
                labelText='Confirm password'
                password={true}
                values={formikprops.values}
                handleChange={formikprops.handleChange}
              />
              <DateField
                label='birthday'
                labelText='Birthday'
                values={formikprops.values}
                handleChange={formikprops.handleChange}
              />
              <TextField
                label='phone_number'
                labelText='Phone number'
                values={formikprops.values}
                handleChange={formikprops.handleChange}
              />
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <CustomButton text='Sign Up' handlePress={formikprops.handleSubmit} />
                <Text>Or</Text>
                <CustomButton size='small' text='Sign In' handlePress={() => navigation.navigate('SignIn')} />
              </View>
            </View>
          )}
        </Formik>
      </Card>
    </View >
  );
}

export default SignUpScreen;
