import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  food_id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price_at_time_of_order: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @IsNotEmpty()
  address_id: number;

  @IsNumber()
  @IsNotEmpty()
  store_id: number;

  @IsNumber()
  total_price: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsArray()
  items: CreateOrderItemDto[];
}
export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  user_id?: string;
  @IsOptional()
  @IsNumber()
  address_id?: number;

  @IsOptional()
  @IsNumber()
  store_id?: number;

  @IsOptional()
  @IsNumber()
  total_price?: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  items?: CreateOrderItemDto[];
}
