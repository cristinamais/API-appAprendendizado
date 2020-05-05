var express = require('express');
var router = express.Router();
var alunosModel = require('../model/alunosModel');

//save-alunos
router.post('/save', function (req, resp, next) {
    var alunos = new alunosModel(req.body);
    try {
        alunos.save(
            err => {
                if (err) {
                    console.log(err);
                    resp.statusMessage = "Bad request";
                    resp.status(400).json(err)
                } else {
                    resp.statusMessage = "Criado";
                    var alunoSalvo = alunos.toObject();
                    resp.status(201).json(alunoSalvo);
                }
            });
    } catch (error) {
        console.log(error);
        resp.status(500).json(error)
    }
});

router.put('/update/:id', function (req, resp, next) {
    try {
        alunosModel.findById(req.params.id, (err, alunos) => {
            if (err) {
                console.log(err)
                resp.statusMessage = "Bad request";
                resp.status(400).json(err)
            } else if (!alunos) {
                resp.statusMessage = "Not found";
                resp.status(404).json({
                    'mensagem': `Recurso ${req.params.id} não encontrado`
                })
            } else {
                alunos.nome = req.body.nome;
                alunos.nota01 = req.body.nota01;
                alunos.nota02 = req.body.nota02;
                alunos.save(
                    err => {
                        if (err) {
                            console.log(err);
                            resp.statusMessage = "Bad request";
                            resp.status(400).json(err)
                        } else {
                            resp.statusMessage = "Aceito";
                            resp.status(202).send("");
                        }
                    });

            }
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json(error)
    }
});

router.delete('/delete/:id', function (req, resp, next) {
    try {
        alunosModel.findById(req.params.id, (err, alunos) => {
            if (err) {
                console.log(err)
                resp.statusMessage = "Bad request";
                resp.status(400).json(err)
            } else if (!alunos) {
                resp.statusMessage = "Not found";
                resp.status(404).json(err)
            } else {
                alunos.remove(
                    err => {
                        if (err) {
                            console.log(err);
                            resp.statusMessage = "Bad request";
                            resp.status(400).json({
                                'mensagem': 'Dados request enviados incorretos'
                            })
                        } else {
                            resp.statusMessage = "Sem conteúdo";
                            resp.status(204).send("");
                        }
                    });

            }
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json(error)
    }
});

router.get('/get-one/:id', function (req, resp, next) {
    try {
        alunosModel.findById(req.params.id, (err, aluno) => {
            if (err) {
                console.log(err)
                resp.statusMessage = "Bad request";
                resp.status(400).json(err)
            } else if (!aluno) {
                resp.statusMessage = "Not found";
                resp.status(404).json({
                    'mensagem': `Recurso ${req.params.id} não encontrado`
                })
            } else {
                resp.statusMessage = "OK";
                resp.json(aluno);
            }
        })        
    } catch (error) {
        console.log(error);
        resp.status(500).json(error) 
    }
});

router.get('/get-all', function (req, resp, next) {
    try {
        alunosModel.find({}, {
            _id: 1,
            nome: 1,
            nota01: 1,
            nota02: 1
        }, (err, alunos) => {
            if (err) {
                resp.statusMessage = "Bad request";
                resp.status(400).json(err)
            } else {
                resp.statusMessage = "OK";
                resp.status(200).json(alunos);
            }
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json(error) 
    }
});

module.exports = router;
