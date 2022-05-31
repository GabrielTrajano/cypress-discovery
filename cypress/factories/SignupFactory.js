const faker = require('faker')
const cpf = require('gerador-validador-cpf')

export default {

    deliver: function(){
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        let data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: "exam2f58543@gmail.com",
            whatsapp: "11999999999",
            address: {
                postalcode: "04534011",
                street: "Rua Joaquim Floriano",
                number: "1000",
                details: " ",
                district: "Itaim Bibi",
                city_state: "São Paulo/SP"
            },
            delivery_method: "Bike Elétrica",
            cnh: "cnh-digital.jpg"
        }
        return data
    }
}