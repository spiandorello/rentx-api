import { Specification } from "../../models/Specification";
import ICategoriesRepository from "../ICategoriesRepository";

class SpecificationsRepository implements ICategoriesRepository {
    private repository: Specification[];

    constructor() {
        this.repository = [];
    }

    findAll(): Specification[] {
        return this.repository;
    }

    public findByName(name: string): Specification | undefined {
        return this.repository.find(Specification => Specification.name === name);
    }

    public save(data: Specification): void {
        this.repository.push(data);
    }
}

export default SpecificationsRepository;
