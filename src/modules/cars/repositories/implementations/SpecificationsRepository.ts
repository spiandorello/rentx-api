import { Specification } from "../../entities/Specification";
import ICategoriesRepository from "../ICategoriesRepository";
import {Category} from "../../entities/Category";

class SpecificationsRepository {
    private repository: Specification[];

    private static INSTANCE: SpecificationsRepository;

    private constructor() {
        this.repository = [];
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
           return this.INSTANCE = new SpecificationsRepository();
        }

        return this.INSTANCE;
    }

    findAll(): Specification[] {
        return this.repository;
    }

    public findByName(name: string): void {
        // return this.repository.find(Specification => Specification.name === name);
    }

    public save(data: Specification): void {
        this.repository.push(data);
    }
}

export default SpecificationsRepository;
