import { injectable, inject } from 'tsyringe';

import Category from '../../entities/Category';
import AppError from '../../../../errors/AppError';
import ISpecificationsRepository from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError('This specification already exists');
        }

        const category = new Category();

        Object.assign(category, {
            name,
            description,
            createdAt: new Date(),
        });

        await this.specificationsRepository.save(category);
    }
}

export default CreateSpecificationUseCase;
