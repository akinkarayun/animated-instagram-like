import React from 'react';
import LottieView from 'lottie-react-native';
import {Dimensions} from 'react-native';

interface LottieAnimationProps {}

const {width: SIZE} = Dimensions.get('window');

export const LottieAnimation: React.FC<LottieAnimationProps> = ({}) => {
  return (
    <LottieView
      resizeMode="contain"
      source={require('../assets/animation/hearts.json')}
      autoPlay
      loop
    />
  );
};
