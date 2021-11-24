const sequlize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequlize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Words = sequlize.define( 'words', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    wordEnglish: {type: DataTypes.STRING, unique: true, allowNull: false },
    wordRussia: {type: DataTypes.STRING, allowNull: false}     
})

const WordsInfo = sequlize.define( 'words_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},   
    description: {type: DataTypes.STRING, allowNull: false}   
})


User.hasMany(Words)
Words.belongsTo(User)

Words.hasMany(WordsInfo, {as: 'info'}) 
WordsInfo.belongsTo(Words)

module.exports = {
    User, 
    Words, 
    WordsInfo
}