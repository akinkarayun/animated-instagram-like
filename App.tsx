import React, {useCallback} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {LottieAnimation} from './components/LottieAnimation';

// const AnimatedComponent = Animated.createAnimatedComponent(LottieAnimation);

const App = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const doubleTapRef = React.useRef();

  const rStyle = useAnimatedStyle(
    () => ({
      transform: [{scale: Math.max(scale.value, 0)}],
    }),
    [],
  );
  const rStyleOpacity = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    [],
  );

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
          <TapGestureHandler
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}>
            <Animated.View>
              <ImageBackground
                source={require('./assets/image/dog.jpg')}
                style={styles.image}>
                <Animated.View style={[styles.image, rStyle]}>
                  <LottieAnimation />
                </Animated.View>
              </ImageBackground>
              {/* <Animated.View style={[styles.image, rStyleOpacity]}> */}
              <Animated.Text style={[styles.text, rStyleOpacity]}>
                Gesture Handler Double and Single Tap
              </Animated.Text>
              {/* </Animated.View> */}
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const {width: SIZE} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
  },
});

export default App;
