import { useRoute } from "@react-navigation/native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { LatLng } from "react-native-maps";

export default function PlacePage() {

    const route = useRoute()

    let coords = route.params as LatLng

    let name = ''
    let description = ''

    function save() {
        console.log('Nome: ', name)
        console.log('Desc: ', description)
    }

    return (
        <View>
            <View>
                <Text>Latitude: {coords.latitude}</Text>
                <Text>Longitude: {coords.longitude}</Text>
            </View>

            <Text>Informe o nome do novo local</Text>

            <Text>Nome:</Text>
            <TextInput style={styles.input} value={name} onChangeText={value => name = value} />

            <Text>Descrição:</Text>
            <TextInput style={styles.input} value={description} onChangeText={value => description = value} />

            <Button title="Salvar" onPress={save} />
        </View>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})