let transactions = [];
let currentPage = 1;
const itemsPerPage = 30;

async function fetchTransactions() {
    try {
        const response = await fetch("https://mercuray-demo-default-rtdb.firebaseio.com/users.json");
        const data = await response.json();

        if (!data) {
            console.error("No data received");
            return;
        }

        transactions = Object.values(data);
        populateDropdowns(transactions);
        renderTransactions(transactions, currentPage);
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
}

document.getElementById("add-filter-btn").addEventListener("click", function() {
    document.getElementById("filter-modal").style.display = "flex";
});

document.querySelector(".close-modal").addEventListener("click", function() {
    document.getElementById("filter-modal").style.display = "none";
});

document.getElementById("start-filter-btn").addEventListener("click", function() {
    const filteredTransactions = applyFilters();
    renderTransactions(filteredTransactions, currentPage);
    document.getElementById("filter-modal").style.display = "none";
});

document.getElementById("no-filter-btn").addEventListener("click", function() {
    document.getElementById("date-filter").value = "All";
    document.getElementById("status-filter").value = "All";
    document.getElementById("name-filter").value = "All";
    document.getElementById("method-filter").value = "All";

    renderTransactions(transactions, currentPage);
});

function getInitials(name) {
    const words = name.split(" ");
    return words.length === 1
        ? words[0].charAt(0).toUpperCase()
        : words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
}

function renderTransactions(transactions, page) {
    const transactionBody = document.getElementById("transaction-body");
    transactionBody.innerHTML = ""; 
    let lastDate = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedTransactions = transactions.slice(start, end);

    paginatedTransactions.forEach(transaction => {
        const row = document.createElement("tr");
        let dateCellContent = transaction.date === lastDate
            ? `<span class='hidden-date'>${transaction.date}</span>`
            : transaction.date;
        lastDate = transaction.date;

        row.innerHTML = `
            <td>${dateCellContent}</td>
            <td>
                <div class="name-container">
                    <span class="circle-icon">${getInitials(transaction.name)}</span> ${transaction.name}
                </div>
            </td>
            <td class="${transaction.status}">${transaction.amount}</td>
            <td>${transaction.account}</td>
            <td>${transaction.method}</td>
            <td> <div class="attachment-icon">
                <i class="fas fa-plus"></i>
            </div></td>
        `;
        transactionBody.appendChild(row);
    });

    document.getElementById("prev-page-btn").disabled = page === 1;
    document.getElementById("next-page-btn").disabled = page * itemsPerPage >= transactions.length;
}

function applyFilters() {
    const dateFilter = document.getElementById("date-filter").value;
    const statusFilter = document.getElementById("status-filter").value;
    const nameFilter = document.getElementById("name-filter").value;
    const methodFilter = document.getElementById("method-filter").value;

    let filteredTransactions = transactions;

    if (dateFilter !== 'All') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.date === dateFilter);
    }
    if (statusFilter !== 'All') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.status === statusFilter);
    }
    if (nameFilter !== 'All') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.name === nameFilter);
    }
    if (methodFilter !== 'All') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.method === methodFilter);
    }

    return filteredTransactions;
}

function populateDropdowns(transactions) {
    const dateFilter = document.getElementById("date-filter");
    const nameFilter = document.getElementById("name-filter");
    const methodFilter = document.getElementById("method-filter");

    let dates = new Set(), names = new Set(), methods = new Set();

    transactions.forEach(transaction => {
        dates.add(transaction.date);
        names.add(transaction.name);
        methods.add(transaction.method);
    });

    dates.forEach(date => dateFilter.innerHTML += `<option>${date}</option>`);
    names.forEach(name => nameFilter.innerHTML += `<option>${name}</option>`);
    methods.forEach(method => methodFilter.innerHTML += `<option>${method}</option>`);
}

document.getElementById("prev-page-btn").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        renderTransactions(transactions, currentPage);
    }
});

document.getElementById("next-page-btn").addEventListener("click", function() {
    if (currentPage * itemsPerPage < transactions.length) {
        currentPage++;
        renderTransactions(transactions, currentPage);
    }
});
fetchTransactions();