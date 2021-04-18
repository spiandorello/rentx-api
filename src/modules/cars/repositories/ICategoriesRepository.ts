import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;

  findAll(): Promise<Category[]>;

  save(data: Category): Promise<void>;
}
