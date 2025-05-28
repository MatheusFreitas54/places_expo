import AsyncStorage from '@react-native-async-storage/async-storage'

import { Place } from '../models/place.model'

const PLACE_DOC_KEY = 'place_doc_key'

class PlaceService {

    private async setList(places: Place[]) {
        const json = JSON.stringify(places)
        await AsyncStorage.setItem(PLACE_DOC_KEY, json)
    }

    private equals(p1: Place, p2: Place) {
        return p1.latitude === p2.latitude && p1.longitude === p2.longitude
    }

    public async getList() {
        const json = await AsyncStorage.getItem(PLACE_DOC_KEY)
        
        if (json) return JSON.parse(json) as Place[]

        return [] as Place[]
    }

    public async save(place: Place) {
        const list = await this.getList()
        
        const saved = list.find(e => this.equals(e, place))
        if (saved) {
            saved.name = place.name
            saved.description = place.description
        } else {
            list.push(place)
        }
        
        this.setList(list)
    }

    public async remove(place: Place) {
        let list = await this.getList()
        list = list.filter(e => !this.equals(e, place))
        this.setList(list)
    }
}

const placeRepo = new PlaceService()
export default placeRepo