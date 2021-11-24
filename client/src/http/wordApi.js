import {$host, $privateHost} from ".";

export const fetchWords = async () => {
    const {data} = await $host.get('api/words')
    return data
}

export const fetchOneWords = async (id) => {
    const {data} = await $host.get('api/words/'+ id)
    return data
}

export const createWord = async (word) => {
    const {data} = await $privateHost.post('api/words', word)
    return data
}

export const deletWord = async (id) => {
    const {data} = await $privateHost.delete('api/words/' + id)
    return data
}