import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  stock_quantity: number;

  @IsNumber()
  store_id: number;
}
