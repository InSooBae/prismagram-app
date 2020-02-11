import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../../components/Loader';
import SquarePhoto from '../../../components/SquarePhoto';

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

//shouldFetch는 쿼리를 요청하기 위한 신호가 됨. 검색쿼리는 즉시요청되는게아님
const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term
    },
    //언제 쿼리를 조회하지 않고 넘길지 설정
    skip: !shouldFetch,
    //검색 결과가 항상 캐시에 저장되지 않도록 fetchPolicy로 설정
    fetchPolicy: 'network-only'
  });
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };
  console.log(data, loading);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
