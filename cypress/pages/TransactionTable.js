
/**
 * Methods used to interact with the Transaction Table
 */

const transactionTableLocator = 'tr td span'

/**
 * Save the Table as an Object, using each Description as key
 * This is used to ensure that each rows data remains intact after sorting
 */
async function saveTableToObject(inputArray) {
  const numberOfRows = inputArray.length / 5
  let columnTextObject = {}
  // Map Each Row in the table 
  for (let count = 0; count < numberOfRows; count += 1) {
      const rowArray = inputArray.splice(0, 5)
      columnTextObject = {...columnTextObject, [rowArray[3]]: rowArray }
  }
  return columnTextObject
}

/**
 * Store Each of the Table Element Text in an Array
 */
async function getTableAsTextArray() {
  let columnTextArray = []
  cy.get(transactionTableLocator)
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
  async function getAmountValueArray(inputArray) {
    let amountValueArray = []
    for (let amountCount = 4; amountCount < inputArray.length; amountCount += 5 ){
      let currentAmount = inputArray[amountCount].replace(/[^0-9$.-]/g, '')
      let parsedFloat = parseFloat(currentAmount)
      amountValueArray.push(parsedFloat)
    }
    console.log('PRE-SORT ' + amountValueArray)
    return amountValueArray
  }

module.exports = {
    getTableAsTextArray,
    saveTableToObject,
    getAmountValueArray,
}