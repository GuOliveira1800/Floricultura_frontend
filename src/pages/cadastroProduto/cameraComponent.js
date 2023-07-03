import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export let binary = null;


const CameraComponent = ({setFotoCarrega, fotoCarrega}) => {

    const [capturedImage, setCapturedImage] = useState(null);
    const [baseImage, setBaseImage] = useState(null);

  useEffect(() => {
    getCameraPermissions();
  }, []);

  const getCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    const { statusa } = await ImagePicker.getCameraPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permissão da câmera negada!');
    }
  };

  const handleCapture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.1,
      base64: true,
    });
    console.log(result.assets[0].base64);
    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      setFotoCarrega(result.assets[0].base64);
    }
  };

  return (
    <View style={{ marginTop: 0 }}>
        {
            fotoCarrega && (
            <View>
                <Image source={{ uri: "data:image/png;base64,"+fotoCarrega }} style={{width:200, height: 200}} />          
            </View>
            )
        }
        <TouchableOpacity onPress={handleCapture}>
            <Text>Capturar Imagem</Text>
        </TouchableOpacity>
    </View>
  );
};

export default CameraComponent;
