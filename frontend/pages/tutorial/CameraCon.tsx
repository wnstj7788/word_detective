import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
    // 카메라 권한 상태를 저장하는 상태 변수
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    // 카메라 참조를 저장하는 useRef
    const cameraRef = useRef<Camera | null>(null);

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
            // 카메라에서 사진을 찍고 사진 데이터를 출력
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo);
            // photo 객체에 사진 데이터가 들어 있음
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
