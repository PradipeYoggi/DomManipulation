// get elements needed for access in code
const productName = document.getElementById('ProductName1');
const dailyRate = document.getElementById('DailyRate1');
const qty = document.getElementById('EquipmentQty1');
const addButton = document.getElementById('AddProductBtn1');
const selection = document.getElementById('selection1');

// Product class represents a rental product
class Product {
    constructor(productName, dailyRate, qty) {
        this.productName = productName;
        this.dailyRate = dailyRate;
        this.qty = qty;
    }
}

// The list of all rental products (pre-defined set)
var products = [];
products.push( new Product('Jack Hammer', 64, 10) );
products.push( new Product('Weed Wacker', 10, 5) );
products.push( new Product('Lawn Mower', 49, 3) );

// click event handler for the Add Product button
addButton.addEventListener('click', (event) => {
    event.preventDefault();
    addRowToTable(productName.value, dailyRate.value, qty.value);
});

// function that adds row to the rental product inventory table
function addRowToTable(productName, dailyRate, qty) {
    // add only if all fields have values
    if (productName != "" && dailyRate != "" && qty != "") {
        let inventoryTable = document.getElementById('inventoryTable');

        // if the input is for a product from the pre-defined set, then update the
        // inventory count
        if (!updateRowIfExists(inventoryTable, productName)) {
            // if not, this is a new product, so add a new inventory row
            let rowNumber = inventoryTable.rows.length;
            let row = inventoryTable.insertRow(rowNumber);
    
            row.insertCell(0).outerHTML = `<th scope="row">${rowNumber}</th>`;
            row.insertCell(1).innerHTML = productName;
            row.insertCell(2).innerHTML = `$${dailyRate}`;
            row.insertCell(3).innerHTML = qty;    
        }
    }
}

// If the provided table has the provided productName, this function updates the qty value
// for that row
function updateRowIfExists(table, productName) {
    tr = table.getElementsByTagName("tr");    
    // Loop through all table rows, and find the row that has the given productName and update it
    for (let i = 0; i < tr.length; i++) {
        let tdProductName = tr[i].getElementsByTagName("td")[0];
        if (tdProductName) {
            let txtValue = tdProductName.textContent || tdProductName.innerText;
            if (txtValue.toUpperCase().indexOf(productName.toUpperCase()) >= 0) {
                getAndUpdateRowValues(tr[i]);
                return true;
            }
        } 
    }
    return false;
}

// updates the qty field in the given table row
function getAndUpdateRowValues(tableRow) {
    let tdQty = tableRow.getElementsByTagName("td")[2];
    let currentQty = parseInt(tdQty.innerText);
    let addQty = parseInt(qty.value);
    tdQty.innerText = currentQty + addQty;
}

// set up the change event handler for the product selection drop down
selection.addEventListener('change', (event) => {
    // on selection, set the pre-defined values for that product to the input fields as defaults
    // and disable the daily rate input field (which gets re-enabled elsewhere)
    let value = selection.options[selection.selectedIndex].value;
    productName.value = products[value-1].productName;
    dailyRate.value = products[value-1].dailyRate;
    qty.value = products[value-1].qty;
    dailyRate.disabled = true;
});

// set up the focusout event handler for the product name input field
productName.addEventListener('focusout', (event) => {
    let matchFound = false;
    // if a custom product (not a pre-defined product) enable the daily rate field
    products.forEach((product) => {
        if (product.productName.toUpperCase().indexOf(productName.value.toUpperCase()) >= 0) {
            matchFound = true;
        }
    });
    if (!matchFound) {
        dailyRate.disabled = false;
    }
});

