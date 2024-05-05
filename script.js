import { names } from './names.js';
import { lastNames } from './lastNames.js';
import { additionSymbols } from './additionSymbols.js';

function generatePassword(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}

function exportToCSV() {
    const table = document.getElementById('generatedTable');
    if (!table) {
        console.error('Table not found.');
        return;
    }

    let csv = 'sep=,\r\n'; 
    const rows = table.querySelectorAll('tr');
    rows.forEach((row) => {
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell, index) => {
            let cellText = cell.textContent.trim();
            if (cellText.includes(',') || cellText.includes('"')) {
                cellText = '"' + cellText.replace(/"/g, '""') + '"';
            }
            csv += cellText + (index !== cells.length - 1 ? ',' : '\r\n');
        });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'generated_table.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Your browser does not support downloading CSV files.');
    }
}

function generateTable(count) {
    const previousTable = document.getElementById('generatedTable');
    if (previousTable) {
        previousTable.remove();
    }

    const table = document.createElement('table');
    table.id = 'generatedTable';

    const headerRow = table.insertRow();
    const headers = ['#', 'Login', 'Password'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        const textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    for (let i = 0; i < count; i++) {
        const login = names[Math.floor(Math.random() * names.length)] + lastNames[Math.floor(Math.random() * lastNames.length)] + additionSymbols[Math.floor(Math.random() * additionSymbols.length)] + generateRandomString(4);
        const password = generatePassword(10);
        const row = table.insertRow();
        const numberCell = row.insertCell();
        const loginCell = row.insertCell();
        const passwordCell = row.insertCell();
        const numberText = document.createTextNode(i + 1);
        const loginText = document.createTextNode(login);
        const passwordText = document.createTextNode(password);
        numberCell.appendChild(numberText); // Add numbering to cell
        loginCell.appendChild(loginText);
        passwordCell.appendChild(passwordText);
    }

    document.body.appendChild(table);

    const exportButton = document.getElementById('exportBtn');
    exportButton.addEventListener('click', exportToCSV);
}

function generateTable25() {
    generateTable(25);
}

function generateTable50() {
    generateTable(50);
}
const gen10Button = document.getElementById('gen10');
gen10Button.addEventListener('click', () => generateTable(10));
const gen25Button = document.getElementById('gen25');
gen25Button.addEventListener('click', generateTable25);

const gen50Button = document.getElementById('gen50');
gen50Button.addEventListener('click', generateTable50);