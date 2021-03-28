import { v4 as uuidV4 } from "uuid";

interface ISpecificationDTO {
    name: string;
    description: string;
    createdAt?: Date
}

class Specification {
    id?: string;

    name: string;

    description: string;

    createdAt: Date;

    constructor() {
        this.id = uuidV4();
    }
}

export { Specification, ISpecificationDTO };
