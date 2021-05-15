import React, { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  const windowHeight = useWindowDimensions().height;
  return (
    <View style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText='Sign in to your Account'
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText='Sign In'
      />
      <NavLink
        text='Dont have an account ? Sign Upinstead'
        routeName='Signup'
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
});

export default SigninScreen;
