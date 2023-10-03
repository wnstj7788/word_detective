import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from "axios";
import * as FileSystem from 'expo-file-system';


export default function App() {
    // 카메라 권한 상태를 저장하는 상태 변수
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const cameraRef = useRef<Camera | undefined>();


    useEffect(() => {
        // 카메라 권한을 요청하고 권한 상태를 업데이트
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);



    // 사진을 찍는 함수
    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();

            console.log(photo);

            const cleanUri = photo.uri.startsWith('file://') ? photo.uri.slice(7) : photo.uri;

            console.log(cleanUri);

            const formData = new FormData();

            // 직접 이미지 데이터를 추가
            formData.append('file', {
                uri: photo.uri, // 사진의 URI를 사용
                name: 'photo.jpg',
                type: 'image/jpeg', // 이미지 형식에 따라 수정하세요.
            });

            formData.append('userId', '01af21be-09a8-41e0-a8ad-2084b501ad53');
            formData.append('wordId', '1');

            try {
                const response = await axios.post('http://192.168.137.1:9999/api/photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    });
                    if (response.status === 200) {
                        console.log('Image upload successful');
                        console.log('Server response:', response.data);
                    } else {
                        console.log('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    if (hasPermission === null) {
        // 권한 상태를 확인 중일 때
        return <View />;
    }
    if (hasPermission === false) {
        // 권한이 거부되었을 때
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {/* 카메라 컴포넌트 */}
            <Camera
                style={styles.camera}
                ref={(ref) => {
                    if (ref) {
                        cameraRef.current = ref;
                    }
                }}
                zoom={0} // 원하는 줌 레벨로 설정합니다.
                ratio="5:4" // 비율을 16:9로 설정합니다.
            >
                {/* 카메라 버튼 컨테이너 */}
                <View style={styles.buttonContainer}>
                    {/* 사진 찍기 버튼 */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                    >
                        <Text style={styles.text}>사진 찍기</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,

    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 16,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
