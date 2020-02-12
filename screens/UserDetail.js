import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../fragments';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native';
import UserProfile from '../components/UserProfile';

const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userName: navigation.getParam('userName') }
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};
