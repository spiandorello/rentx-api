import fs from 'fs';
import csvParser from 'csv-parser';
import { inject, injectable } from 'tsyringe';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

interface IRequest {
  file: Express.Multer.File;
}

interface ICategoryImport {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  public constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  private loadFile(filepath: string): Promise<ICategoryImport[]> {
    const parser = csvParser();
    const categories: ICategoryImport[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filepath)
        .pipe(parser)
        .on('data', ({ name, description }) =>
          categories.push({ name, description }),
        )
        .on('end', () => {
          fs.unlinkSync(filepath);
          return resolve(categories);
        })
        .on('error', reject);
    });
  }

  async execute({ file }: IRequest): Promise<void> {
    const dataParsed = await this.loadFile(file.path);

    dataParsed.map(async ({ name, description }) => {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name,
      );
      if (!categoryAlreadyExists) {
        const category = new Category();
        Object.assign(category, {
          name,
          description,
        });

        await this.categoriesRepository.save(category);
      }
    });
  }
}

export default ImportCategoryUseCase;
