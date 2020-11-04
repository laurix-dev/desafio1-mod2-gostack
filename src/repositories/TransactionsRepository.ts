import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // Vou percorrer o vetor de transações e somar os outcomes e incomes e criar
  // um balanço em um objeto {outcome:300,income:500,total:200}
  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    // n sabia usar o reduce entao acabei usando um for mesmo ehehehe
    for (let i = 0; i < this.transactions.length; i += 1) {
      if (this.transactions[i].type === 'income') {
        balance.income += this.transactions[i].value;
        balance.total += this.transactions[i].value;
      }
      if (this.transactions[i].type === 'outcome') {
        balance.outcome += this.transactions[i].value;
        balance.total -= this.transactions[i].value;
      }
    }
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
