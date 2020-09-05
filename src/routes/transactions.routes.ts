import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const balance = await transactionsRepository.getBalance();

  const transactions = await transactionsRepository.find();

  const transactionsObject = {
    transactions,
    balance,
  };
  response.json(transactionsObject);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransactionService = new CreateTransactionService();
  const createTransaction = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });
  return response.send(createTransaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const deleteTransactionService = new DeleteTransactionService();

  await deleteTransactionService.execute({
    transaction_id: request.params.id,
  });

  response.status(204).send();
});

transactionsRouter.post('/import', async (request, response) => {
  const importTransactionsService = new ImportTransactionsService();
  const transactions = await importTransactionsService.execute();
  response.json(transactions);
});

export default transactionsRouter;
