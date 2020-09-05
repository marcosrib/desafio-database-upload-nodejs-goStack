import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import AppError from '../errors/AppError';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    const transaction = await transactionsRepository.findOne(transaction_id);

    if (!transaction) throw new AppError('id not found', 400);

    await transactionsRepository.delete(transaction_id);
  }
}

export default DeleteTransactionService;
