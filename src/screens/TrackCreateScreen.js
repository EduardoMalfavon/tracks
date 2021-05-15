// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const windowHeight = useWindowDimensions().height;
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView
      forceInset={{ top: 'always' }}
      style={[{ minHeight: Math.round(windowHeight) }]}>
      <Text h3>Create Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  headerTitleStyle: { alignSelf: 'center' },
  title: 'Add Track',
  tabBarIcon: <FontAwesome name='plus' size={20} />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
