import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

// 로딩 상태 표시 컴포넌트
import {Image} from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.loadingContainer}>
            <Image source={require('../../assets/etc/loding.gif')}
                   style={{width: 100, height: 100, alignSelf: 'center'}}
            />
        </View>
    );
};


export default function App() {
    // 카메라 권한 상태를 저장하는 상태 변수
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    // 로딩 상태를 저장하는 상태 변수
    const [isLoading, setIsLoading] = useState(false);
    // 업로드 진행도를 저장하는 상태 변수 (0-100)
    const [uploadProgress, setUploadProgress] = useState(0);

    const cameraRef = useRef<Camera | undefined>();
    const navigation = useNavigation();


    useEffect(() => {
        // 카메라 권한을 요청하고 권한 상태를 업데이트
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    // 사진을 찍는 함수
    const takePicture = async () => {
        if (cameraRef.current) {
            setIsLoading(true); // 로딩 시작

            try {
                const photo = await cameraRef.current.takePictureAsync();

                console.log(photo);

                const cleanUri = photo.uri.startsWith('file://') ? photo.uri.slice(7) : photo.uri;

                console.log(cleanUri);

                const formData = new FormData();

                formData.append('file', {
                    uri: photo.uri,
                    name: 'photo.jpg',
                    type: 'image/jpeg',
                });

                formData.append('userId', '1');

                const response = await axios.post(`https://j9b105.p.ssafy.io/uploads`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },

                    onUploadProgress: (progressEvent) => {
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);

                    },
                });

                if (response.status === 200) {
                    console.log('Image upload successful');
                    console.log('Server response:', response.data);
                    navigation.navigate('PhotoSelect', { data: response.data });

                } else {
                    console.log('Image upload failed');
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error uploading image:', error);
                setIsLoading(false);
            }
        }
    };



    if (hasPermission === null) {
        // 권한 상태를 확인 중일 때
        return <View/>;
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
                ratio="22:9" // 비율을 16:9로 설정합니다.
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
            {isLoading && <LoadingScreen/>}
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
        color: 'white'
    },

    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)'
    },

    loadingText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
