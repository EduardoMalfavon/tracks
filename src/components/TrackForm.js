import React, { useContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

export default () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  const windowHeight = useWindowDimensions().height;
  return (
    <View style={[{ minHeight: Math.round(windowHeight / 2) }]}>
      <Spacer>
        <Input
          value={name}
          placeholder='Enter name'
          onChangeText={changeName}
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title='Stop' onPress={stopRecording} />
        ) : (
          <Button title='Start Recording' onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button title='Save recording' onPress={saveTrack} />
        ) : null}
      </Spacer>
    </View>
  );
};
