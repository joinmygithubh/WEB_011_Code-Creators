document.addEventListener("DOMContentLoaded", async function () {
    const apiUrl = "https://mercuray-demo-default-rtdb.firebaseio.com/payment.json";
    const response = await fetch(apiUrl);
    const data = await response.json();
    const payments = Object.values(data || {});

    function renderTable(data, tableBody) {
        tableBody.innerHTML = "";
        data.forEach(payment => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${payment.date || "N/A"}</td>
                <td>${payment.to || "N/A"}</td>
                <td>$${payment.amount ? payment.amount.toLocaleString() : "0.00"}</td>
                <td>${payment.approvals || "N/A"}</td>
             <td class="user-info">
                    <img src="/users/profile.webp" alt="User" />
                    ${payment.requestedBy || "N/A"}
                </td>
                <td><span class="status ${payment.status ? payment.status.toLowerCase() : ''}">${payment.status || "Unknown"}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }

    const needApprovalPayments = payments.filter(p => p.status === "Pending");
    const scheduledPayments = payments.filter(p => p.status === "Scheduled");
    const sentPayments = payments.filter(p => p.status === "Sent");

    renderTable(needApprovalPayments, document.getElementById("needApprovalTableBody"));
    renderTable(scheduledPayments, document.getElementById("scheduledTableBody"));
    renderTable(sentPayments, document.getElementById("sentTableBody"));

    document.getElementById("needApprovalCount").textContent = needApprovalPayments.length;
    document.getElementById("scheduledCount").textContent = scheduledPayments.length;
    document.getElementById("sentCount").textContent = sentPayments.length;

    function showTable(tableId) {
        document.querySelectorAll("table").forEach(table => {
            table.style.opacity = "0";
            setTimeout(() => {
                table.classList.remove("active");
            }, 200);
        });
        setTimeout(() => {
            document.getElementById(tableId).classList.add("active");
            document.getElementById(tableId).style.opacity = "1";
        }, 200);
    }

    document.getElementById("needApprovalBtn").addEventListener("click", () => showTable("needApprovalTable"));
    document.getElementById("scheduledBtn").addEventListener("click", () => showTable("scheduledTable"));
    document.getElementById("sentBtn").addEventListener("click", () => showTable("sentTable"));
});