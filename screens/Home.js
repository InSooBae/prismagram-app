import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components';
import Loader from '../components/Loader';
import { gql, from } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        userName
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          userName
        }
        createdAt
      }
      createdAt
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

//요소가 많다면 (performance) FlatList 아님 생긴게 ScrollView?? -> 난 FlatList

export default () => {
  //새로고침 상태 저장 위해 state
  const [refreshing, setRefreshing] = useState(false);
  //useQuery에는 refetch가 있음 -> 새로고침 하고싶으면 refetch실행
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  console.log(loading, data);
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? <Loader /> : <Text>HELLO</Text>}
    </FlatList>
  );
};
