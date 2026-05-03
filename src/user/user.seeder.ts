import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserRole } from 'src/auth/entities/UserRole';

const INITIAL_USERS = [
  {
    name: 'Administrador',
    username: 'admin',
    password: process.env.ADMIN_PASSWORD ?? 'admin123',
    role: UserRole.ADMIN,
  },
  {
    name: 'Developer',
    username: 'developer',
    password: process.env.DEVELOPER_PASSWORD ?? 'developer123', 
    role: UserRole.DEVELOPER,
  },
];

@Injectable()
export class UserSeeder implements OnApplicationBootstrap {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async onApplicationBootstrap() {
    for (const userData of INITIAL_USERS) {
      const exists = await this.repo.findOneBy({ username: userData.username });

      if (!exists) {
        const hashed = await bcrypt.hash(userData.password, 10);
        const user = this.repo.create({ ...userData, password: hashed });
        await this.repo.save(user);
        console.log(`Usuario "${userData.username}" creado (${userData.role})`);
      } else {
        console.log(`Usuario "${userData.username}" ya existe, omitiendo.`);
      }
    }
  }
}