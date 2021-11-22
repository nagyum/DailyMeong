import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';


export default function ButtonUI() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{alert("배변 여부 (이미지 생성)")}}>
                    <MaterialCommunityIcons name="emoticon-poop" size={45} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{alert("산책 시작")}}>
                    <FontAwesome name="play-circle-o" size={80} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{alert("촬영 시작")}}>
                    <Feather name="camera" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        margin: 50
    },
})
