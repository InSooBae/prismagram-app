import React, { useState } from 'react';
import { FlatList, RefreshControl, ScrollView } from 'react-native';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../components/Loader';
import Post from '../../components/Post';
import { POST_FRAGMENT } from '../../fragments';
//react-native-web은 react-native 로 코드를 작성 모든 View는 div로 바뀜

const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
