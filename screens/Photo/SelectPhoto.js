import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import Loader from '../../components/Loader';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import constants from '../../constants';

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = photo => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    //나에게 권한요청. MediaLibrary가 필요로 하는 permissions.CAMERA_ROLL을 요청함
    //Object{"expires":"never","status":"granted"} -> ACCESS
    //처음 권한 안할시 하라는 표시 해주는게 좋다. 아직 안함
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                style={{
                  width: constants.width,
                  height: constants.height / 2
                }}
                source={{ uri: selected.uri }}
              />
              <ScrollView
                contentContainerStyle={{
                  flexWrap: 'wrap',
                  flexDirection: 'row'
                }}
              >
                {allPhotos.map(photo => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      key={photo.id}
                      source={{ uri: photo.uri }}
                      style={{
                        width: constants.width / 3,
                        height: constants.height / 6,
                        opacity: photo.id === selected.id ? 0.5 : 1
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            'Opps'
          )}
        </View>
      )}
    </View>
  );
};
