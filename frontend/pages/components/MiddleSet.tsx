import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface MiddleSetProps {
    children: ReactNode;
}

const MiddleSet: React.FC<MiddleSetProps> = ({ children }) => {
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 11 }}>
                {children}
            </View>
            <View style={{ flex: 1 }} />
        </View>
    );
};

export default MiddleSet;
