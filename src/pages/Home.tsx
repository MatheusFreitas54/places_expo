import React from 'react'
import { Alert, View, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import MapView, { LongPressEvent, Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { Place } from '../models/place.model'
import placeRepo from '../services/place.service'

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    React.useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const [location, setLocation] = React.useState<Location.LocationObject>()
    const [places, setPlaces] = React.useState<Place[]>([])
    
    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied')
            return
        }

        setLocation(await Location.getCurrentPositionAsync({}))
    }

    async function fetchPlaces() {
        setPlaces(await placeRepo.getList())
    }
    
    React.useEffect(() => {
        getCurrentLocation()
    }, [])

    useFocusEffect(() => {
        fetchPlaces()
    })

    function goToPlacePage(event: LongPressEvent) {
        const coords = event.nativeEvent.coordinate
        navigation.navigate('Place', coords)
    }
    function editPlacePage(place: Place) {
        navigation.navigate('Place', place)
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MapView
                style={styles.map}
                showsUserLocation={true}
                zoomControlEnabled={true}
                initialCamera={location && {
                    center: location.coords,
                    heading: 0, pitch: 0, zoom: 15
                }}
                onLongPress={goToPlacePage}
            >
                { places.map(e => (
                    <Marker
                        key={e.name}
                        title={e.name}
                        onCalloutPress={() => editPlacePage(e)}
                        coordinate={{ latitude: e.latitude, longitude: e.longitude }}
                    />
                )) }
            </MapView>
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
