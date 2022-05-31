import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Sign Up', ()=>{

    // beforeEach(function(){
    //     cy.fixture('deliver')
    //         .then((deliver_json) => {
    //             this.deliver = deliver_json
    //     })
    // })

    it('User must become a deliver', function(){
        
        let deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
                
        const expectedMesssage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMesssage)

    })
    
    it('Invalid CPF', function(){

        let deliver = signupFactory.deliver()
        deliver.cpf = '000000414LA'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        
        cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')
    })
    it('Invalid E-mail', function(){
        let deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        
        cy.get('.alert-error').should('have.text', 'Oops! Email com formato inválido.')
    })

    context('Required fields', function(){
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]
        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })
})