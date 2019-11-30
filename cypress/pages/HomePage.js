class HomePage {

    get transactionTable() { return { locator: 'tr td span', label: 'Transaction Table' } }
    get amountHeader() { return { locator: '#amount', label: 'Amount Column Header' } }
    get expensesChartLink() { return { locator: 'a#showExpensesChart', label: 'Expenses Chart Link' } }
    get expensesChart() { return { locator: 'canvas#canvas', label: 'Expenses Chart' } }
    get addDataSetLink() { return { locator: '#addDataset', label: 'Add Data Set Link' } }

    
    getColumnCount() {
        return 5
    }

    sortByAmount() {
        cy.get(this.amountHeader.locator).click()
    }
    
    clickExpensesChart() {
        cy.get(this.expensesChartLink.locator).click()
        cy.wait(3000) // Nothing to key off for table change. Would investigate further
        cy.get(this.expensesChart.locator).should('be.visible')
    }

    clickShowDataForNextYear() {
        cy.get(this.addDataSetLink.locator).click()
        cy.wait(3000) // Nothing to key off for table change. Would investigate further
        cy.get(this.expensesChart.locator).should('be.visible')
    }

    saveTableToObject(inputArray) {
        console.log(inputArray)
        const numberOfRows = inputArray.length / this.getColumnCount()
        console.log('Number of Rows: ' + numberOfRows)
        let columnTextObject = {}
        // Map Each Row in the table 
        for (let count = 0; count < numberOfRows; count += 1) {
           const rowArray = inputArray.splice(0, this.getColumnCount())
           columnTextObject = {...columnTextObject, [rowArray[3]]: rowArray }
        }
        return columnTextObject
      }
    
    /**
     * Store Each of the Table Element Text in an Array
     */
    getTableAsTextArray() {
        let columnTextArray = []
        cy.get(this.transactionTable)
          .each(element => { 
            if(element.text()){
              columnTextArray.push(element.text())
          }
        })
        return columnTextArray
      }
    
      /**
       * Get an Array of the Value Amounts
       * Parses out the non float characters so it can be sorted
       * @param {} inputArray 
       */
     getAmountValueArray(inputArray) {
        let amountValueArray = []
        for (let amountCount = 4; amountCount < inputArray.length; amountCount += this.getColumnCount() ){
          let currentAmount = inputArray[amountCount].replace(/[^0-9$.-]/g, '')
          let parsedFloat = parseFloat(currentAmount)
          amountValueArray.push(parsedFloat)
        }
        console.log('PRE-SORT ' + amountValueArray)
        return amountValueArray
      }

}

export default new HomePage