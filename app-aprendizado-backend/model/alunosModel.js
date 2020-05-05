var mongoose = require('mongoose');
var mongooseSequence = require("mongoose-sequence");
var Schema = mongoose.Schema;
var AutoIncrement = mongooseSequence(mongoose);

var alunosModel = new Schema({
    _id: Number,
    nome: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    nota01: {
        type: Number,
        required: true
    },
    nota02: {
        type: Number,
        required: true
    },
}, {
    _id: false
});

alunosModel.plugin(AutoIncrement, {
    collection_name: "alunos_counter"
});
module.exports = mongoose.model("alunos", alunosModel);