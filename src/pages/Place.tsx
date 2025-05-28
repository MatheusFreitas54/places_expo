import React from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native"
import { LatLng } from "react-native-maps"

import placeRepo from '../services/place.service'
import { Place } from "../models/place.model"

export default function PlacePage() {

    const navigate = useNavigation()
    const route = useRoute()

    let coords = route.params as Place

    const [name, setName] = React.useState(coords.name ? coords.name : '')
    const [description, setDescription] = React.useState(coords.description ? coords.description : '')

    function save() {
        if (!name || name === '') {
            Alert.alert('Nome é obrigatório!')
            return
        }
        
        const place: Place = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            name, description
        }

        placeRepo.save(place).then(() => {
            navigate.goBack()
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Latitude: {coords.latitude}</Text>
                <Text>Longitude: {coords.longitude}</Text>
            </View>

            <Text style={styles.label}>Informe o nome do novo local</Text>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputDesc}
                    multiline numberOfLines={10}
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={save} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        padding: 20,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    inputView: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 3,
    },
    inputDesc: {
        height: 160,
        borderWidth: 2,
        borderRadius: 3,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
    },
    buttonView: {
        padding: 20,
    }
})