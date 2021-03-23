import { v4 as uuidV4 } from "uuid";

interface ICategoryDTO {
    name: string;
    description: string;
}

class Category {
    id?: string;

    name: string;

    description: string;

    createdAt: Date;

    constructor() {
        this.id = uuidV4();
        this.createdAt = new Date();
    }
}

export { Category, ICategoryDTO };
