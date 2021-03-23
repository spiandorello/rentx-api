import fs from 'fs';
import csvParser from 'csv-parser';
import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import {Category} from "../../models/Category";

interface IRequest {
    file: Express.Multer.File;
}

interface ICategoryImport {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    public constructor(private categoriesRepository: CategoriesRepository) {
    }

    private loadFile(filepath: string): Promise<ICategoryImport[]> {
        const parser = csvParser();
        const categories: ICategoryImport[] = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filepath)
                .pipe(parser)
                .on('data', ({ name, description }) => categories.push({ name, description }))
                .on('end', () => {
                    fs.unlinkSync(filepath);
                    return resolve(categories);
                })
                .on('error', reject);
        });
    }

    async execute({ file }: IRequest): Promise<void> {
        const dataParsed = await this.loadFile(file.path);

        dataParsed.forEach(({ name, description }) => {
            const categoryAlreadyExists = this.categoriesRepository.findByName(name);
            if (!categoryAlreadyExists) {
                const category = new Category();
                Object.assign(category, {
                    name,
                    description,
                });

                this.categoriesRepository.save(category);
            }
        });
    }
}

export default ImportCategoryUseCase;
