import AppError from "@errors/AppError";
import CreateCategoryUseCase from "./CreateCategoryUseCase";
import CategoriesRepositoryInMemory from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

let categoryRepository: CategoriesRepositoryInMemory;
let createCategoryUserCase: CreateCategoryUseCase;

describe('Create category', () => {
    beforeEach(() => {
        categoryRepository = new CategoriesRepositoryInMemory();
        createCategoryUserCase = new CreateCategoryUseCase(categoryRepository);
    });

    it('should be able to create a new category', async () => {
        const category = {
            name: 'Style',
            description: 'Style Category',
        };

        await createCategoryUserCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoryRepository.findByName(category.name)

        expect(categoryCreated).toHaveProperty('id');
    });

    it('should not be able to create a new category with name already existent', async () => {
        const category = {
            name: 'Style',
            description: 'Style Category',
        };

        await createCategoryUserCase.execute({
            name: category.name,
            description: category.description,
        });

        await expect(createCategoryUserCase.execute({
            name: category.name,
            description: category.description,
        })).rejects.toBeInstanceOf(AppError);
    });
});
