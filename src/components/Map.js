import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import { Location, Permissions } from 'expo';
import GeoLocation from "react-native-geolocation-service";

const height = Dimensions.get('window').height-350

const Map = () => {
    const [initialRegion, setInitialRegion] = useState({
        latitude: 37.4214418,
        longitude: 126.9891955,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006
    })

    const [mapWidth, setMapWidth] = useState('99%');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const updateMapStyle = () => {
        setMapWidth('100%')
    }
    
    useEffect(() => {
        (async () => {
            // navigator.geolocation.getCurrentPosition(
            //     position => {
            //         const currentLatitude = JSON.stringify(position.coords.latitude);
            //         const currentLongitude = JSON.stringify(position.coords.longitude);
            //         this.setState({ currentLatitude: currentLatitude });
            //         this.setState({ currentLongitude: currentLongitude });
            //     },
            //     error => alert(error.message),
            //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            // );
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                setErrorMsg("Permission to access location was denied");
                return;
            }
            
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text="Loading...";
    if (errorMsg){
        text = errorMsg;
    } else if (location){
        // latitude = location.latitude;
        // longitude = location.longitude;
        text = JSON.stringify(location);
    }
    
    return(
        <MapView
            style={{ height }}
            initialRegion={initialRegion}
            loadingEnabled={true}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onMapReady={() => {
                updateMapStyle()
            }}
        />
    );
}

export default Map





// const height = Dimensions.get('window').height-350

// export default class Map extends React.Component {
//     state = {
//         location: {},
//         errorMessage: ''
//     }

//     componentDidMount(){
//         this._getCurrentLocation();
//     }

//     async _getCurrentLocation() {
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 let region = {
//                     latitude: parseFloat(position.coords.latitude),
//                     longitude: parseFloat(position.coords.longitude),
//                     latitudeDelta: 0.008,
//                     longitudeDelta: 0.008
//                 };
//                 await this.setState({
//                     initialRegion: region,
//                 })
//             },
//             error => console.log(error),
//             {
//                 enableHighAccuracy: true,
//                 timeout: 20000,
//                 maximumAge: 1000,
//             }
//         )
//     }

//     // _getLocation = async() => {
//     //     const { status } = await Location.requestForegroundPermissionsAsync();
//     //     if (status !== 'granted') {
//     //         console.log('PERMISSION NOT GRANTED!');

//     //         this.setState({
//     //             errorMessage: 'PERMISSION NOT GRANTED'
//     //         })
//     //     }

//     //     const location = await Location.getCurrentPositionAsync();
//     //     this.setState({
//     //         location
//     //     })
//     // }

//     render(){
//         return(
//             <MapView
//                 style = {{ height }}
//                 region = {this.state.initialRegion}
//             ></MapView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }
// })



// 디바이스 현재 위치로 zoom 코드 예시 (안 돌아감)
// import React from 'react';
// import {
//   Alert,
//   Platform,
//   StyleSheet,
//   animateToRegion
// } from 'react-native';
// import MapView from 'react-native-maps'
// import * as Location from 'expo-location'


// const LATITUDE_DELTA = 0.01;
// const LONGITUDE_DELTA = 0.01;

// const initialRegion = {
//   latitude: -37.78825,
//   longitude: -122.4324,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// }

// export default class Map extends React.Component {

//   map = null;

//   state = {
//     region: {
//       latitude: -37.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     },
//     ready: true,
//     filteredMarkers: []
//   };

//   setRegion(region) {
//     if(this.state.ready) {
//       setTimeout(() => this.map.mapview.animateToRegion(region), 10);
//     }
//     //this.setState({ region });
//   }

//   componentDidMount() {
//     console.log('Component did mount');
//     this.getCurrentPosition();
//   }

//   getCurrentPosition() {
//     try {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const region = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           };
//           this.setRegion(region);
//         },
//         (error) => {
//           //TODO: better design
//           switch (error.code) {
//             case 1:
//               if (Platform.OS === "ios") {
//                 Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
//               } else {
//                 Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
//               }
//               break;
//             default:
//               Alert.alert("", "Error al detectar tu locación");
//           }
//         }
//       );
//     } catch(e) {
//       alert(e.message || "");
//     }
//   };

//   onMapReady = (e) => {
//     if(!this.state.ready) {
//       this.setState({ready: true});
//     }
//   };

//   onRegionChange = (region) => {
//     console.log('onRegionChange', region);
//   };

//   onRegionChangeComplete = (region) => {
//     console.log('onRegionChangeComplete', region);
//   };

//   render() {

//     const { region } = this.state;
//     const { children, renderMarker, markers } = this.props;

//     return (
//       <MapView
//         showsUserLocation
//         ref={ map => { this.map = map }}
//         data={markers}
//         initialRegion={initialRegion}
//         renderMarker={renderMarker}
//         onMapReady={this.onMapReady}
//         showsMyLocationButton={false}
//         onRegionChange={this.onRegionChange}
//         onRegionChangeComplete={this.onRegionChangeComplete}
//         style={StyleSheet.absoluteFill}
//         textStyle={{ color: '#bc8b00' }}
//         containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>

//         {/* {markers.map(renderMarker)} */}

//         {children && children || null}

//       </MapView>
//     );
//   }
// }
