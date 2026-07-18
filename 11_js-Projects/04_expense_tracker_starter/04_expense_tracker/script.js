document.addEventListener('DOMContentLoaded', ()=>{
    const expenseFormInput = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseListDisplay = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenseList = JSON.parse(localStorage.getItem('expense')) || [];
    expenseList.forEach(expense => renderExpense(expense));
    calcTotal()

    expenseFormInput.addEventListener('submit', (event)=>{
        event.preventDefault()

        let name = expenseNameInput.value.trim()
        let price = parseInt(expenseAmountInput.value.trim())

        if(name === "" || isNaN(price) || price <= 0) return

        const currExpense = {
            id : Date.now(),
            name,
            price
        }

        renderExpense(currExpense);
        expenseList.push(currExpense);

        calcTotal();
        saveExpense();

        expenseNameInput.value = ""
        expenseAmountInput.value = ""
    })


    function saveExpense(){
        localStorage.setItem('expense', JSON.stringify(expenseList))
    }

    function renderExpense(expense){
        let expenseLi = document.createElement('li');
        expenseLi.id = expense.id

        expenseLi.innerHTML = `
        <span>${expense.name} - ${expense.price}Rs</span>
        <button>delete</button>
        `
        expenseListDisplay.appendChild(expenseLi)

        expenseLi.addEventListener('click', (e)=>{
            e.stopPropagation();

            expenseList = expenseList.filter(exp => exp.id !== expense.id)
            calcTotal()
            saveExpense()
            expenseLi.remove();
        })
    }

    function calcTotal(){
        let total = 0

        for(const num of expenseList) {
            total += num.price
        }

        totalAmountDisplay.textContent = total.toFixed(2)
    }
})