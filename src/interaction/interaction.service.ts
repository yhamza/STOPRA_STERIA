import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InteractionEntity } from '../database/entities/interactions.entity';
import { CreateInteractionDto } from 'src/database/dto/interaction/Interaction.dto';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class InteractionService {
  private   url = process.env.URL || 'http://localhost:3000/api/v1';
  constructor(
    @InjectRepository(InteractionEntity)
    private readonly interactionRepository: Repository<InteractionEntity>,
    private readonly httpService: HttpService
  ) {}


  // Create interaction
  async create(createInteractionDto: CreateInteractionDto): Promise<InteractionEntity> {

    let interaction = await this.interactionRepository.create(createInteractionDto);
    interaction.category=this.setCategory(interaction.action)
    return  this.interactionRepository.save(interaction);

  }
  // get interactions by user 
  async findByUserId(userId: string): Promise<InteractionEntity[]> {
    return this.interactionRepository.find({
      where: { userId : userId },
    });
  }
  // delete interactions by user
  async deleteByUserId(userId){    
    return this.interactionRepository.delete({userId: userId});
  }


  //save user cach and user statistics
  async setCache(userId: string) {
    const allInteractions = await this.findByUserId(userId);
    const Cachesformat = {
      userId: userId,
      value: allInteractions.map(interaction => ({
        action: interaction.action,
        category: interaction.category,
        time: interaction.timestamp,  
      })),
    };
    try {
      
      const response = await this.httpService
      
        .post(`${this.url}/caches`, Cachesformat)
        .toPromise();
        try {
          const response2=await this.httpService
          .post(`${this.url}/statistics`,response.data)
          .toPromise()
          
        } catch (error) {
          throw new Error("Erreur lors de l'envoi de la requête à StatisticsController");
          
        }
    } catch (error) {
      throw new Error("Erreur lors de l'envoi de la requête à CachesController");
    }
  }
  
    // set ineteraction category
    setCategory(action: string): string {
      const actionCategoryMap: { [key: string]: string } = {
        
        click: 'interface_interaction',
        view: 'interface_interaction',
        scroll: 'interface_interaction',
        hover: 'interface_interaction',
        submit: 'interface_interaction',
  
        like: 'content_interaction',
        share: 'content_interaction',
        comment: 'content_interaction',
        
        login: 'auth_interaction',
        logout: 'auth_interaction',
        update_profile: 'auth_interaction',
        
        search: 'navigation_interaction',
        filter: 'navigation_interaction',
        navigate: 'navigation_interaction',
  
        get: 'management_interaction',
        create: 'management_interaction',
        update: 'management_interaction',
        delete: 'management_interaction',
      };
    
      return actionCategoryMap[action] || 'unknown_interaction';
    }








}
