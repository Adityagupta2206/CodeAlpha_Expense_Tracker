document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.name}</span>
                <span>$${expense.amount}</span>
                <button class="delete" onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function addExpense(name, amount) {
        expenses.push({ name, amount });
        renderExpenses();
    }
    window.deleteExpense = function(index) {
        expenses.splice(index, 1);
        renderExpenses();
    }
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
        addExpense(expenseName, expenseAmount);
        expenseForm.reset();
    });
    renderExpenses();
});
