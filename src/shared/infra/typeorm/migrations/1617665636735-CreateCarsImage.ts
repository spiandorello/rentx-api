import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarsImage1617665636735 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cars_image',
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
                    name: 'car_id',
                    type: 'uuid'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
            foreignKeys: [
                {
                    name: 'FKCarsImage',
                    referencedTableName: 'cars',
                    referencedColumnNames: ['id'],
                    columnNames: ['car_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
