import express from "express";
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }    
));

app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários." })
    }
})

app.post('/usuarios', async (req, res) => {
    console.log("Requisição recebida", req.body); 

    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                age: req.body.age,
                name: req.body.name
            }
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." })
    }
})


app.put('/usuarios/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10); // Conversão de ID para inteiro
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                email: req.body.email,
                age: req.body.age,
                name: req.body.name
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário." })
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where:{
            id:req.params.id
        }
    })

    res.status(200).json({mensgae: "deletado"})
  
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

