import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text} from 'react-native';
import ReactNativeBiometrics, {
  BiometryTypes,
  FaceID,
} from 'react-native-biometrics';

function App() {
  useEffect(() => {
    ShowPass();
  }, []);

  const ShowPass = async () => {
    // const rnBiometrics = new ReactNativeBiometrics();
    // const {biometryType} = await rnBiometrics.isSensorAvailable();
    // rnBiometrics.isSensorAvailable().then(resultObject => {
    //   const {available, biometryType} = resultObject;

    //   if (available && biometryType === BiometryTypes.TouchID) {
    //     console.log('TouchID is supported');
    //   } else if (available && biometryType === BiometryTypes.FaceID) {
    //     console.log('FaceID is supported');
    //   } else if (available && biometryType === BiometryTypes.Biometrics) {
    //     console.log('Biometrics is supported');
    //   } else {
    //     console.log('Biometrics not supported');
    //   }
    // });
    // if (biometryType === Biometrics.TouchID) {
    //   //do something fingerprint specific
    // }
    // console.log(' hi face ***', rnBiometrics);
    const handleFaceIDUnlock = async () => {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
      });

      if (success) {
        console.log('Face ID authentication successful!');
        // Allow access to the app's main functionality
      } else {
        console.error('Face ID authentication failed:', error);
        // Handle other errors (e.g., user cancellation, system error)
      }
    };

    const handleBiometricAuth = async () => {
      try {
        const rnBiometrics = new ReactNativeBiometrics({
          allowDeviceCredentials: true,
        });
        const {success, error} = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to continue',
        });

        if (success) {
          Alert.alert('Success', 'Biometric authentication successful');
          return true;
        } else {
          Alert.alert(
            'Authentication failed',
            'Biometric authentication failed',
          );
          return false;
        }
      } catch (error) {
        console.error('[handleBiometricAuth] Error:', error);
        Alert.alert('Error', 'Biometric authentication failed from device');
        return false;
      }
    };

    const enableBiometricAuth = () => {
      const rnBiometrics = new ReactNativeBiometrics({
        allowDeviceCredentials: true,
      });
      rnBiometrics
        .isSensorAvailable()
        .then(resultObject => {
          const {available, biometryType} = resultObject;

          console.log('  biometryType   *******   ', biometryType);

          if (available && biometryType === BiometryTypes.TouchID) {
            Alert.alert(
              'TouchID',
              'Would you like to enable TouchID authentication for the next time?',
              [
                {
                  text: 'Yes please',
                  onPress: async () => {
                    Alert.alert(
                      'Success!',
                      'TouchID authentication enabled successfully!',
                    );
                  },
                },
                {text: 'Cancel', style: 'cancel'},
              ],
            );
          } else if (available && biometryType === BiometryTypes.FaceID) {
            handleFaceIDUnlock();
          } else if (available && biometryType === BiometryTypes.Biometrics) {
            handleBiometricAuth();
          } else {
            Alert.alert(
              'Biometrics not supported',
              'This device does not support biometric authentication.',
            );
          }
        })
        .catch(error => {
          console.error('Error:', error);
          Alert.alert(
            'Error',
            'An error occurred while checking biometrics availability.',
          );
        });
    };
    enableBiometricAuth();
  };

  return (
    <SafeAreaView>
      <Text>Test</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
