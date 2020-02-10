import React from 'react';
import { Image, Platform } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import constants from '../constants';

const Container = styled.View`
  background: #fffffc;
`;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 700;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 12px;
`;

const Caption = styled.Text`
  margin: 3px 0px;
`;
//files가 없을때 대비 (default value 빈 배열 )
const Post = ({
  user,
  location,
  files = [],
  likeCount,
  caption,
  comments = []
}) => {
  return (
    <Container>
      <InfoContainer>
        <Header>
          <Touchable>
            <Image
              style={{ height: 40, width: 40, borderRadius: 20 }}
              source={{ uri: user.avatar }}
            />
          </Touchable>
          <Touchable>
            <HeaderUserContainer>
              <Bold>{user.userName}</Bold>
              <Location>{location}</Location>
            </HeaderUserContainer>
          </Touchable>
        </Header>
        <Swiper
          style={{ height: constants.height / 2.5 }}
          paginationStyle={{ position: 'absolute', bottom: -25 }}
          dotStyle={{ width: 4, height: 4 }}
          activeDotStyle={{ width: 4, height: 4 }}
        >
          {files.map(file => (
            //react-native에서는 네트워크의 이미지를 보여주기 위해선 이미지의 높이를 지정해줘야함
            <Image
              style={{ width: constants.width, height: constants.height / 2.5 }}
              key={file.id}
              source={{ uri: file.url }}
            />
          ))}
        </Swiper>
        <IconsContainer>
          <IconContainer>
            <Touchable>
              <Ionicons
                size={28}
                name={
                  Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'
                }
              />
            </Touchable>
          </IconContainer>
          <IconContainer>
            <Touchable>
              <Ionicons
                size={28}
                name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'}
              />
            </Touchable>
          </IconContainer>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? '1 like' : `${likeCount} likes`}</Bold>
        </Touchable>

        <Caption>
          <Bold>{user.userName}</Bold> {caption}
        </Caption>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default Post;
