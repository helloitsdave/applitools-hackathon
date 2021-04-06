class HomePage {

    get transactionTable() { return { locator: 'tr td span', label: 'Transaction Table' } }
    get amountHeader() { return { locator: '#amount', label: 'Amount Column Header' } }
    get expensesChartLink() { return { locator: 'a#showExpensesChart', label: 'Expenses Chart Link' } }
    get expensesChart() { return { locator: 'canvas#canvas', label: 'Expenses Chart' } }
    get addDataSetLink() { return { locator: '#addDataset', label: 'Add Data Set Link' } }

    /**
     * Current Column Count
     * Setting here so the logic can be updated easily if the number
     * of columns change.
     */
    getColumnCount() {
        return 5
    }

    clickExpensesChart() {
        cy.get(this.expensesChartLink.locator).click()
        cy.wait(3000) // Nothing in the dom to key off for table change. Would investigate further
        cy.get(this.expensesChart.locator).should('be.visible')
    }

    clickShowDataForNextYear() {
        cy.get(this.addDataSetLink.locator).click()
        cy.wait(3000) // Nothing in the dom to key off for table change. Would investigate further
        cy.get(this.expensesChart.locator).should('be.visible')
    }

    sortByAmount() {
      cy.get(this.amountHeader.locator).click()
  }

}

export default new HomePage