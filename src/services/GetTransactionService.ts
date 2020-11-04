import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface BalanceResult {
  transactions: Array<Transaction>;
  balance: Balance;
}

class GetTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): BalanceResult {
    const balanceResult: BalanceResult = {
      transactions: this.transactionsRepository.all(),
      balance: this.transactionsRepository.getBalance(),
    };

    return balanceResult;
  }
}

export default GetTransactionService;
