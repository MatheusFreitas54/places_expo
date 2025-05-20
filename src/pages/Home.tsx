import React from 'react'
import { Alert, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import MapView from 'react-native-maps'
import * as Location from 'expo-location'

export default function HomePage() {

    const [location, setLocation] = React.useState<Location.LocationObject>()
    
    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied')
            return
        }

        setLocation(await Location.getCurrentPositionAsync({}))
    }
    
    React.useEffect(() => {
        getCurrentLocation()
    }, [])

    console.log('Coords: ', location)

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MapView
                style={styles.map}
                showsUserLocation={true}
                initialCamera={location && {
                    center: location.coords,
                    heading: 0, pitch: 0, zoom: 15
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    }
})
