export const SET_WORDS = 'word/SET_WORDS'
export const WORD_ASYNC = '/word/FETCH_WORDS'
const SET_ONE_WORD = 'word/SET_ONE_WORD'
const DELETE_WORD = 'word/DELETE_WORD'
const SET_ADD_WORD = 'word/SET_ADD_WORD'

const initialState = {
    words: [],
    oneWord: null
}

const wordReducer = (state = initialState, action)  => {   
    
    switch(action.type) {
        case SET_WORDS :
            return {
                ...state,
                words : [...action.payload]
            }
        case SET_ONE_WORD :
            return {
                ...state,
                oneWord: action.payload
            }
        case SET_ADD_WORD : 
            return {
                ...state,
                words: [...state.words, action.payload]
            }
        case DELETE_WORD :            
            return {
                ...state,
                words: state.words.filter(word => word.id !== action.payload)
            }
        default : 
            return state
    }
}

export const setWords = (payload) => ({type:SET_WORDS, payload})
export const fetchWordsAction = () => ({type:WORD_ASYNC})

export const setWordOne = (payload) => ({type:SET_ONE_WORD, payload})
export const setAddWord  = (payload) => ({type:SET_ADD_WORD, payload})
export const setWordDeletion = (payload) => ({type:DELETE_WORD, payload})


export default wordReducer