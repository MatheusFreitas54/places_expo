import AsyncStorage from '@react-native-async-storage/async-storage'

import { Place } from '../models/place.model'

const PLACE_DOC_KEY = 'place_doc_key'

class PlaceService {

    private async setList(places: Place[]) {
        const json = JSON.stringify(places)
        await AsyncStorage.setItem(PLACE_DOC_KEY, json)
    }

    public async getList() {
        const json = await AsyncStorage.getItem(PLACE_DOC_KEY)
        
        if (json) return JSON.parse(json) as Place[]

        return [] as Place[]
    }

    public async save(place: Place) {
        const list = await this.getList()
        
        list.push(place)
        
        this.setList(list)
    }

    public async remove(place: Place) {
        let list = await this.getList()

        list = list.filter(e => {
            if (e.latitude === place.latitude && e.longitude === place.longitude) {
                return false
            }
            return true
        })

        this.setList(list)
    }
}

const placeRepo = new PlaceService()
export default placeRepo