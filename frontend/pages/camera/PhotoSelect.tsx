import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import QuestionCard from '../components/QuestionCard'; // 실제 경로로 교체해주세요.


const PhotoSelect = ({ route }) => {
    const { data } = route.params;
    console.log(data);

    return (
        <ImageBackground source={require("../../assets/background/main/mainBackground.png")} style={{flex: 1}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {Object.entries(data).map(([key, values], index) => {
                    return values.map((value, i) => (
                        <QuestionCard
                            key={`${index}-${i}`}
                            word={{ name: key }}
                            type={{ pictureHidden: false, wordHiddenIndx: 0 }}
                        />
                    ));
                })}
            </View>
        </ImageBackground>
    );
};

export default PhotoSelect;
