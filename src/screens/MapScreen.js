import React from "react";
import { View } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Map from '../components/Map';

const MapScreen = () => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Map />
        </SafeAreaView>
    )
}

export default MapScreen;