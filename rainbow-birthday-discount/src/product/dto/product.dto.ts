import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  description?: string;
  
  @IsDecimal()
  @IsNotEmpty()
  price: number;
  
  @IsString()
  @IsNotEmpty()
  unit: string;
  
  @IsString()
  category?: string;
  
  @IsString()
  item?: string;
  
  @IsString()
  variety?: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  unit?: string
  category?: string;
  item?: string;
  variety?: string;
}
