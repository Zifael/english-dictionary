const ApiError = require('../error/ApiError')
const {Words, WordsInfo} = require('../models/models')


class WordController {
    async create(req, res, next) {
        try{
            let {wordEnglish, wordRussia, info} = req.body
            let words = await Words.create({wordEnglish, wordRussia})            
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    WordsInfo.create({                        
                        description: i.description,
                        wordId: words.id
                    })    
                )
            }      
            return res.json(words)
        }catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getAll(req, res) {
        let {limit,page} = req.query
        page = page || 1
        limit = limit || 50
        let offset = page * limit -limit
        const words = await Words.findAndCountAll({limit, offset})
        return res.json(words)
    }

    async getOne(req, res) {
        const {id} = req.params 
        const wordsOne = await Words.findOne(
            {
                where: {id},
                include: [{model:WordsInfo, as: 'info'}]         
            },
        )
        return res.json(wordsOne)
    }

    async deletWord(req, res) {
        const {id} = req.params
        const deletWord = await Words.destroy({ where: {id} })
        return res.json(deletWord)
    }
}

module.exports = new WordController()