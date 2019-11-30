import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'

before(() => {
  LoginPage.visit()
})

beforeEach(() => {
  cy.eyesOpen({appName: 'Applitools Comp', batchName: 'Hackathon - V2'})
})

describe('1. Login Page Elements', () => {
  it('should check the default login screen', ()=> {
    cy.eyesCheckWindow('initial login screen')
  })
})


describe(`2. Data Driven Login`, () => {

  const scenario1 = {
    test: 'Login: No Username or Password', username: '', password: '', error: true,
  }
  const scenario2 = {
    test: 'Login: No Password', username: 'test', password: '', error: true,
  }
  const scenario3 = {
    test: 'Login: No Username', username: '', password: 'pass', error: true,
  }
  const scenario4 = {
    test: 'Login: Valid Account', username: 'auser', password: 'pass', error: false,
  }
  
  const loginTests = [scenario1, scenario2, scenario3, scenario4]

  loginTests.forEach((scenario) => {
      it(`should attempt login with:  ${scenario.test}`, () => {
      LoginPage.clearUsernameAndPassword()

      if (scenario.username) {
        LoginPage.enterUsername(scenario.username)
      }
      if (scenario.password) {
        LoginPage.enterPassword(scenario.password)
      }

      LoginPage.clickSubmit()

      if (scenario.error) {
          cy.eyesCheckWindow(scenario.test)
      }
      else {
          cy.eyesCheckWindow(scenario.test)
      }
    })
   })
  })

  describe('3. Table Sort', () => {
    before( () => {
      LoginPage.visit()
      LoginPage.login()
    })
    it(`should verify the initial table sorting`, () => {
        cy.eyesCheckWindow('Initial Table Sort', {
          sizeMode: 'selector',
          selector: '#transactionsTable' 
        })
      })
    it(`should sort by amount`, () => {
        cy.get('#amount').click()
      })
    it(`should be sorted by amount in ascending order`, () => {
        cy.eyesCheckWindow('Updated Table Sorted By Amount', {
          sizeMode: 'selector',
          selector: '#transactionsTable' 
        })
      })  
  })

  describe('4. Compare Expenses', () => {
    before(() => {
      LoginPage.visit()
      LoginPage.login()
    })
    it(`should display the expenses chart with two year default`, () => {
      HomePage.clickExpensesChart()
      cy.eyesCheckWindow(3000, 'Default Expenses Table: Two Years', {
        sizeMode: 'selector',
        selector: '#canvas' 
      })
      })
    it(`should add 2019 to the expenses chart`, () => {
      HomePage.clickShowDataForNextYear()
      cy.eyesCheckWindow(3000, 'Expenses Table: With Additional Year 2019', {
        sizeMode: 'selector',
        selector: '#canvas' 
      })
    })
   })

  describe('5. Dynamic Content Test', () => {
    before(() => {
      LoginPage.visitDynamic()
      LoginPage.login()
    })
    it(`should display two different "Flash sale" gifs`, () => {
      cy.eyesCheckWindow('dynamic sale gifs')
      })
    })
  
afterEach(() => {
  cy.eyesClose()
})