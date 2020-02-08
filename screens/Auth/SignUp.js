import React, { useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import AuthButton from '../../components/AuthButton';
import { CREATE_ACCOUNT } from './AuthQueries';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import * as Facebook from 'expo-facebook';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const fNameInput = useInput('');
  const lNameInput = useInput('');
  //login에서 보낸 parameter가 있으면 받고 없으면 '' empty String
  const emailInput = useInput(navigation.getParam('email', ''));
  const userNameInput = useInput('');
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: userNameInput,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value
    }
  });

  // 이메일이 유효한지 검증
  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: userName } = userNameInput;
    //이메일 99.99% 유효성 체크
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fName === '') {
      return Alert.alert('Please Input your name');
    }
    if (!emailRegex.test(email)) {
      return Alert.alert('That email is Invalid');
    }
    if (userName === '') {
      return Alert.alert('Invalid Username');
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert('Account Created!', 'Log In Now!');
        navigation.navigate('Login', { email });
      }
    } catch (e) {
      Alert.alert('This Username / Email is already Taken!', 'Log In Instead');
      navigation.navigate('Login', { email });
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    try {
      setLoading(true);
      //702792976920597 appId in faceBook appId를 이용해 페이스북에 로그인 요청을 하면 ,tpye에 성공or실패/토큰이 전달됨
      await Facebook.initializeAsync('702792976920597');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      });
      if (type === 'success') {
        //type이 success면 fetch함수를 이용해 token이 입력된 api주소에 요청 아래 주소가 페이스북api
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email,name`
        );
        //fetch는 결과물로 json도 전달해줌.
        const { email, first_name, last_name, name } = await response.json();
        if (email !== undefined) {
          emailInput.setValue(email);
        }
        fNameInput.setValue(first_name);
        lNameInput.setValue(last_name);
        userNameInput.setValue(email.split('@')[0]);
        setLoading(false);
        console.log(email, first_name, last_name);

        Alert.alert('Logged in!', `Hi ${name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First Name"
          autoCorrect={false}
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last Name"
          autoCorrect={false}
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...userNameInput}
          placeholder="User Name"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSignUp} text="Sign Up" />
        <FBContainer>
          <AuthButton
            bgColor={'#2D4DA7'}
            loading={false}
            onPress={fbLogin}
            text="Connect FaceBook"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
