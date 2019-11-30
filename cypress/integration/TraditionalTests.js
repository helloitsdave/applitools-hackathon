import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'

before(() => {
  LoginPage.visit()
})

describe('Test 1. Login Page Elements', () => {
  LoginPage.getElements().forEach((element) => {
    it(`should dislay the "${element.label}"`, () => {
      cy.get(element.locator)
        .should('be.visible')
    })
  })
  LoginPage.getText().forEach((textElement) => {
    it(`should dislay the "${textElement.label}" element`, () => {
      cy.get(textElement.locator)
        .should('be.visible')
    })
    it(`should contain the label "${textElement.label}"`, () => {
      cy.get(textElement.locator)
        .should('contain.text', textElement.label)
    })
  })
  LoginPage.getImages().forEach((image) => {
    it(`should dislay the "${image.label}" image`, () => {
      cy.get(image.locator)
        .should('be.visible')
    })
  })
})

/*  Keeping here for demonstration. Would have in separate file */
const ERROR1 = 'Both Username and Password must be present'
const ERROR2 = 'Password must be present'
const ERROR3 = 'Username must be present'

describe(`Test 2. Data Driven Login`, () => {
  const scenario1 = {
    test: 'No Username or Password', username: '', password: '', error: ERROR1,
  }
  const scenario2 = {
    test: 'No Password', username: 'test', password: '', error: ERROR2,
  }
  const scenario3 = {
    test: 'No Username', username: '', password: 'pass', error: ERROR3,
  }
  const scenario4 = {
    test: 'Valid Login', username: 'auser', password: 'pass', error: '',
  }
  
  const loginTests = [scenario1, scenario2, scenario3, scenario4]

  loginTests.forEach((scenario) => {
      it(`should click on submit with ${scenario.test}`, () => {
        LoginPage.clearUsernameAndPassword()

        if (scenario.username) {
          LoginPage.enterUsername(scenario.username)
        }
        if (scenario.password) {
          LoginPage.enterPassword(scenario.password)
        }

        LoginPage.clickSubmit()
      })
        if (scenario.error) {
          it(`should see the error: ${scenario.error}`, () => {
            cy.get('div[class="alert alert-warning"]')
              .should('be.visible')
            cy.get('div[class="alert alert-warning"]')
              .should('contain.text', scenario.error)
          })
        }
        else {
          it(`should login successfully`, () => {
            cy.get('#showExpensesChart')
              .should('be.visible')
          })
        }
    })
  })

  describe('Test 3. Table Sort', () => {

    let initialColumnTextArray = []
    let updatedColumnTextArray = []
    let expectedAmountOrderArray = []
    let actualAmountOrderArray = []
    let initialAmountArray = []
    let initialTableObject = {}
    let sortedTableObject = {}

    before(() => {
      LoginPage.visit()
      LoginPage.login()
    })
    it(`should get the initial table row text for each cell as an array`, async () => {
      initialColumnTextArray = await HomePage.getTableAsTextArray()
      })
    it(`should get an array containing each of the intial amounts`, async () => {
        initialAmountArray = await HomePage.getAmountValueArray(initialColumnTextArray)
        expectedAmountOrderArray = initialAmountArray.sort(function(a, b){
          return a - b})
        console.log(expectedAmountOrderArray)
        })
    it(`should save the table row cells as an object for comparison`, async () => {
      initialTableObject = await HomePage.saveTableToObject(initialColumnTextArray)
      })
    it(`should click on the amount column header`, async () => {
        HomePage.sortByAmount()
        updatedColumnTextArray = await HomePage.getTableAsTextArray()
      })
    it(`should be sorted by amount in ascending order`, async () => {
        actualAmountOrderArray = await HomePage.getAmountValueArray(updatedColumnTextArray)
        expect(actualAmountOrderArray).to.deep.equal(expectedAmountOrderArray)
        })   
    it(`should keep each row’s data intact after the sorting`, async () => {
        sortedTableObject = await HomePage.saveTableToObject(updatedColumnTextArray)
        expect(initialTableObject).to.deep.equal(sortedTableObject)
        })  
  })

  describe('Test 4. Compare Expenses', () => {
    before(() => {
      LoginPage.visit()
      LoginPage.login()
    })
    it(`should click on compare expenses and display expense chart`, () => {
        HomePage.clickExpensesChart()
      /* Unable to access the dom of the canvas element. */

      })
    it(`should add 2019 to the expenses chart`, () => {
        HomePage.clickShowDataForNextYear()
      /* Unable to access the dom of the canvas element. */
   })

  describe('Test 5. Dynamic Content Test', () => {
    before(() => {
      LoginPage.visitDynamic()
      LoginPage.login()
    })
    it(`should display two different "Flash sale" gifs`, () => {
        cy.get('div[id^="flashSale"] img').its('length').should('eq', 2)
      })
   })
})