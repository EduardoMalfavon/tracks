import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

export default ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Spacer>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Email'
          value={email}
          onChangeText={setEmail}
        />
      </Spacer>
      <Spacer>
        <Input
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          label='Password'
          value={password}
          onChangeText={setPassword}
        />
      </Spacer>
      {errorMessage !== '' && (
        <Spacer>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Spacer>
      )}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
  },
});
