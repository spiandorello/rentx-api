import { Category } from '../../models/Category';
import ISpecificationsRepository from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    public execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new Error('This specification already exists');
        }

        const category = new Category();

        Object.assign(category, {
            name,
            description,
            createdAt: new Date(),
        });

        this.specificationsRepository.save(category);
    }
}

export default CreateSpecificationService;
