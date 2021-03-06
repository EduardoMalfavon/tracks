import React, { useContext} from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage} = useContext(
    AuthContext
  );

  const windowHeight = useWindowDimensions().height;

  return (
    <View style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText='Sign up for Tracker'
        errorMessage={state.errorMessage}
        submitButtonText='Sign Up'
        onSubmit={signup}
      />
      <NavLink
        text='Already have an account? Sign in instead!'
        routeName='Signin'
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
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
export default SignupScreen;
