import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'app' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    username: string;

    @Column({ name: 'request_limit', type: 'int', nullable: true })
    requestLimit: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
