import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1617322213542 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cars',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: "uuid",
                    isPrimary: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'daily_rate',
                    type: 'numeric'
                },
                {
                    name: 'is_available',
                    type: 'bool',
                    default: true
                },
                {
                    name: 'license_plate',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'fine_amount',
                    type: 'numeric',
                },
                {
                    name: 'brand',
                    type: 'varchar',
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
            foreignKeys: [
                {
                    name: 'FKCategoryCar',
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    columnNames: ['category_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }
}
