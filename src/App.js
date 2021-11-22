import React from "react";
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import ButtonUI from "./components/Button";
import MapScreen from './screens/MapScreen'
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-navigation";

export default App = () => {
    return(
            <View>
                <MapScreen />
                <StatusBar auto />
            </View>
    )
}
                
           
// const App = () => {
//     return (
            // <View style={styles.button}>
            //     <ButtonUI />
            // </View>
//     )
// }

// const styles=StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: 'flex-end',
//         justifyContent: 'space-between',
//         margin: 50
//     },
// })

// export default App;