import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // Aqui pra criar um outcome temos que verificar se o balanco nao vai
  // ficar negativo, se ficar entao nao podemos criar esse transaction
  public execute({ title, value, type }: RequestDTO): Transaction {
    // aqui pegamos o balanco atual
    const balance = this.transactionsRepository.getBalance();

    // aqui calculamos balanco total menos o valor da transacao que o usario esta tentando fazer
    const total = balance.total - value;

    // checando se a transação for de outcome e a soma do balanco dele for menor que zero então não podemos permitir a transação ser concluida
    if (type === 'outcome' && total < 0) {
      throw Error(
        'Eiita essa transação ae ta deixando sua conta negativa! N permitiremos isso',
      );
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
