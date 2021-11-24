import {take,takeEvery, put, call} from 'redux-saga/effects'
import { fetchWords } from '../../http/wordApi'
import { WORD_ASYNC, setWords} from '../word-reducer'


const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* getWordsWorker() {   
    try{
        const data = yield call(fetchWords)    
        yield put(setWords(data.rows)) // put() === dispatch()
    }catch(e) {
        yield console.error('Запрос на сервер не прошел :' ,e)
    }
}

export function* watchSaga() {       
    yield takeEvery(WORD_ASYNC, getWordsWorker)     
}

export default function* rootSaga() {
    yield watchSaga()
}



