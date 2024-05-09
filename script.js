import { names } from './names.js';
import { lastNames } from './lastNames.js';
import { additionSymbols } from './additionSymbols.js';

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRandomString(length) {
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * CHARSET.length);
        randomString += CHARSET[randomIndex];
    }
    return randomString;
}

function generatePassword(length) {
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * CHARSET.length);
        password += CHARSET[randomIndex];
    }
    return password;
}

function generateLogin() {
    return names[Math.floor(Math.random() * names.length)] +
        lastNames[Math.floor(Math.random() * lastNames.length)] +
        additionSymbols[Math.floor(Math.random() * additionSymbols.length)] +
        generateRandomString(4);
}

function generateTable(count) {
    const previousTable = document.getElementById('generatedTable');
    if (previousTable) {
        previousTable.remove();
    }

    const table = document.createElement('table');
    table.id = 'generatedTable';

    const headers = ['#', 'Login', 'Password'];
    const headerRow = table.insertRow();
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    for (let i = 0; i < count; i++) {
        const login = generateLogin();
        const password = generatePassword(10);
        const row = table.insertRow();
        row.insertCell().textContent = i + 1; // Add numbering to cell
        row.insertCell().textContent = login;
        row.insertCell().textContent = password;
    }

    document.body.appendChild(table);
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

function setupGenerateTableButtons() {
    const gen10Button = document.getElementById('gen100');
    gen10Button.addEventListener('click', () => generateTable(100));
    const gen25Button = document.getElementById('gen250');
    gen25Button.addEventListener('click', () => generateTable(250));
    const gen50Button = document.getElementById('gen500');
    gen50Button.addEventListener('click', () => generateTable(500));
}

document.addEventListener('DOMContentLoaded', () => {
    setupGenerateTableButtons();
    const exportButton = document.getElementById('exportBtn');
    exportButton.addEventListener('click', exportToCSV);
});
