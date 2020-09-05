import { getRepository, TransactionRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);
    const categoryResult = await categoryRepository.findOne({
      where: { title: category },
    });

    let category_id = '';

    if (!categoryResult) {
      const categoryObject = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(categoryObject);
      category_id = categoryObject.id;
    }

    if (categoryResult) {
      category_id = categoryResult.id;
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
