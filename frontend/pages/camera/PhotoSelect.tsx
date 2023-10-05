import React, {useEffect, useState} from 'react';
import { FlatList, ImageBackground } from 'react-native';
import CameraCard from '../components/CameraCard'; // 실제 경로로 교체해주세요.
import { useNavigation } from '@react-navigation/native';

const PhotoSelect = ({ route }) => {
    const navigation = useNavigation();
    const { data, origin } = route.params;
    console.log(data);
    console.log(origin);
    const [uniqueData, setUniqueData] = useState([]);

    useEffect(() => {
        const newData = [];

        Object.entries(data).forEach(([key, values]) => {
            // 각 키에 대해 첫 번째 이미지만 저장
            newData.push({ name: key , imgUrl: values[0]});
        });

        setUniqueData(newData);
    }, [data]);

    return (
        <ImageBackground source={require("../../assets/background/main/mainBackground.png")} style={{flex: 1}}>
            <FlatList
                data={uniqueData}
                renderItem={({ item }) =>
                    <CameraCard
                        word={item}
                        type={{ pictureHidden:false , wordHiddenIndx :0 }}
                        origin={origin}
                        navigation={navigation}  // 여기서 navigation prop을 추가합니다.
                    />
                }
                keyExtractor={(item) => item.name}
                numColumns={4}
            />
        </ImageBackground>
    );
};

export default PhotoSelect;
