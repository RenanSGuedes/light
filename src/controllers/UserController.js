const axios = require('axios')
const path = require('path')
const User = require('../models/User')

module.exports = {
  async index(req, res, next) { 
    const { distance } = req.query
    const geolocationResponse = await axios.get('https://ipapi.co/json/')
    const { latitude, longitude } = geolocationResponse.data
  
    try {
      const filter = await User.find({
        location: { 
          $near: {
            $geometry: { type: "Point",  coordinates: [ longitude, latitude ] },
            $maxDistance: distance * 1000,
          }
        }
      }).limit(6) 

      var data = {
        titlePage: 'Objetivos do Desenvolvimento Sustentável - 7',
        titleForm: 'Nosso Projeto',
        descriptionInForm: 'Atualmente no Brasil diversas pessoas enfrentam problemas de classe energética devido à constante desigualdade na distribuição de recursos e, na maioria dos casos por serem vítimas da marginalização.',
        userInvite: 'Faça parte disso! Seu relato nos ajuda a saber das maiores dificuldades na sua região.',
        users: filter,
        distance
      }
      return res.render(path.join(__dirname, '..', 'public', 'index.html'), data)
    } catch (error) {
      next(error)
    }
    //const filter = await User.find()

    //return res.status(200).json(filter)
  },
  async create(req, res, next) {
    const { username, mail, cep, report } = req.body
    const geolocationResponse = await axios.get('https://ipapi.co/json/')
    const adressResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    
  
    const { latitude, longitude } = geolocationResponse.data
    const { logradouro, bairro, localidade, uf } = adressResponse.data
  
    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    }
  
    function parseUserFirstName(string) {
      return string.split(' ').map(w => w.trim()).shift()
    }
  
    try {
      await User.create({
        username,
        mail,
        first_name: parseUserFirstName(username),
        user_city: localidade,
        user_state: uf,
        location,
        street: logradouro,
        district: bairro,
        report
      })
    } catch (error) {
      next(error)
    }
  
    return res.status(202).send("Tudo Certo")
  }
}