const Modal = {
    // Open MOdal.
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },

    //Close Modal.
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}
const transactions = [
    {
        id: 0,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 1,
        description: 'Websites',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },]

const Transaction = {
    all: transactions,
    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes() {
        let income = 0;

        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })

        return income;
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsCntainer: documet.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amaunt = Utils.formatCurrency(transaction.amaunt)

        const html = '
            < td class="description" > ${ transaction.description }</td >
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        '

        return hmtl
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsCntainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance()