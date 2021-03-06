import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';
import { ActivityIndicator } from 'react-native';

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  background-color: ${props =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 15px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 1.5};
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;
//ActivityIndicator = 로딩
const AuthButton = ({ text, onPress, loading = false, bgColor = null }) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={'white'} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default AuthButton;
