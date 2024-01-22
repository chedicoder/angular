import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  create(createProjectDto: CreateProjectDto) {
   return this.projectRepository.save(createProjectDto);
  }

  findAll() {
    return this.projectRepository.find(); 
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({ where:{ id:id}} );

    if (!project) {
      throw new NotFoundException('Projet introuvable');
    }

    return project;  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id,updateProjectDto);
  }

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
