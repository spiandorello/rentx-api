import { getRepository, Repository } from 'typeorm';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }

  async save({ description, name }: Category): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }
}

export default CategoriesRepository;
