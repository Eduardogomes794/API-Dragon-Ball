const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.use(express.static('front'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/front/index.html')
})

app.get('/dados', async (req, res) => {  
  let personagemId = req.query.id;
  const response = await axios.get(`https://dragonball-api.com/api/characters/${personagemId}`)

  const nome = response.data.name
  const raca = response.data.race
  const gen = response.data.gender
  let imagem;


  if (nome === "Goku" || nome === "Vegeta") {
    imagem = `https://dragonball-api.com/characters/${nome.toLowerCase()}_normal.webp`; // URL da imagem para Goku e Vegeta
  } else if (nome === "Jiren" || nome === "Toppo" || nome === "Freezer") {
    imagem = `https://dragonball-api.com/characters/${nome}.webp`; // URL da imagem para Personagens sem lower case na url
  } else if(nome === "Zeno"){
    imagem = `https://dragonball-api.com/characters/${nome}_Artwork.webp`;
  }
   else if (nome === "Gogeta"){
    imagem = `https://dragonball-api.com/transformaciones/${nome.toLowerCase()}.webp`
  } else if(nome === "Vegetto"){
    imagem = `https://dragonball-api.com/transformaciones/${nome}.webp`
  }
   else {
    imagem = `https://dragonball-api.com/characters/${nome.toLowerCase()}.webp`; // URL padrão para personagens com lower case na url
  }

  const dados = {
    nome: nome,
    raca: raca,
    genero: gen,
    imagem: imagem
  }

  res.json(dados)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// usar o npm install com o express e o axios url da api: https://web.dragonball-api.com/documentation
