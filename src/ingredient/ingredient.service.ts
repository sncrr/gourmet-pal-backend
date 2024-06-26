import { Injectable } from '@nestjs/common';
import { Ingredient, Prisma } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { CreateRecipeIngredientPayload } from '../modules/recipe/recipe.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientService extends BaseService<Ingredient> {

  constructor (protected prisma: PrismaService) {
    super(prisma, 'ingredient')
  }

  async checkIngredients (payload: CreateRecipeIngredientPayload[]): Promise<Prisma.RecipeIngredientCreateWithoutRecipeInput[]> {

    let ingredients = [];

    for(let item of payload) {
      
      if(item.ingredientId) {
        ingredients.push({
          ingredientId: item.ingredientId,
          unit: item.unit,
          qty: item.qty
        });
      }
      else {
        
        let newIngredient = await this.create({
          name: item.name,
          // TODO: image
          image: '',
        });

        ingredients.push({
          ingredientId: newIngredient.id,
          unit: item.unit,
          qty: item.qty
        });
      }
    }

    return ingredients;
  }
}
