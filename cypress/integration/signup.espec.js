
import signupFactory from '../factories/SignupFactory'
import { it } from 'faker/lib/locales'
import signupPage from '../pages/SignupPage'

describe('Signup', () => {

  // beforeEach(function() {
    //   cy.fixture('deliver').then((d)=> {
  //          this.deliver = d
  //     })
//   })

    // before(function() {
    //     cy.log('Tudo aqui é executado uma única vez Antes de Todos os casos de testes')
    //})

    //beforeEach(function() {
    //  cy.log('Tudo aqui é executado sempre Antes de cada caso de teste')
    //})

    //afterEach(function() {
    //  cy.log('Tudo aqui é executado sempre Depois de CADA caso de teste')
    //})

    //after(function() {
    //  cy.log('Tudo aqui é executado uma única vez Depois de Todos os casos de testes')
    //})

    it('User should be deliver', function()  {
        
        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function() {
        
        var deliver = signupFactory.deliver()
        
        deliver.cpf = '000000141aa'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')

       // cy.get('form button[type="submit"]').click()
    })

    it('Incorrect email', function() {
        
        var deliver = signupFactory.deliver()
        
        deliver.email = 'user.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    it('Required fields', function(){
        signupPage.go()
        signupPage.submit()

        signupPage.alertMessageShouldBe('É necessário informar o nome')
        signupPage.alertMessageShouldBe('É necessário informar o CPF')
        signupPage.alertMessageShouldBe('É necessário informar o email')
        signupPage.alertMessageShouldBe('É necessário informar o CEP')
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        signupPage.alertMessageShouldBe('Selecione o método de entrega')
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    })
})