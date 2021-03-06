import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { POST_FRAGMENT } from '../fragments';
import Loader from '../components/Loader';
import Post from '../components/Post';
import { ScrollView } from 'react-native';

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam('id') }
  });
  console.log(loading, data);
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
