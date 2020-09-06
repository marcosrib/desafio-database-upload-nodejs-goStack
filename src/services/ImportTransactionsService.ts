import path from 'path';
import { getRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import loadCSV from '../config/file';

class ImportTransactionsService {
  async execute(): Promise<Transaction[]> {
    const categoriesRepository = getRepository(Category);

    const transactionsRepository = getRepository(Transaction);

    const csvFilePath = path.resolve(__dirname, 'import_template.csv');

    const dataCSV = await loadCSV(csvFilePath);

    const categoriesTitles = dataCSV.map(category => category[3]);
    const categoriesTitlesUniques = categoriesTitles.filter(
      (title, i, self) => self.indexOf(title) === i,
    );

    const categories = await categoriesRepository.find({
      where: { title: In(categoriesTitlesUniques) },
    });

    const categoriesTitle = categories.map(category => category.title);

    const categoriesExistes = categoriesTitlesUniques.filter(
      title => !categoriesTitle.includes(title),
    );

    const categoryCreated = categoriesRepository.create(
      categoriesExistes.map(title => ({
        title,
      })),
    );

    const categoriesSaved = await categoriesRepository.save(categoryCreated);

    const newCategories = [...categories, ...categoriesSaved];

    const transactions = transactionsRepository.create(
      dataCSV.map(transaction => ({
        title: transaction[0],
        type: transaction[1] as 'income' | 'outcome',
        value: Number(transaction[2]),
        category: newCategories.find(c => c.title === transaction[3]),
      })),
    );

    const createdTransactios = await transactionsRepository.save(transactions);
    return createdTransactios;
  }
}

export default ImportTransactionsService;
