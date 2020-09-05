import path from 'path';
import { getRepository, In } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import loadCSV from '../config/file';

class ImportTransactionsService {
  async execute(): Promise<Transaction[]> {
    const categoriesRepository = getRepository(Category);

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

    categoriesRepository.save(categoryCreated);

    console.log(categoriesExistes);

    console.log(categoriesTitlesUniques);

    return [];
  }
}

export default ImportTransactionsService;
