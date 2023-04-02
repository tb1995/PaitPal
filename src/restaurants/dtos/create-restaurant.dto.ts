import { IsEmail, IsString, IsLongitude, IsLatitude } from 'class-validator';
import { Geometry, Point } from 'typeorm';
import {} from 'geojson-validation';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;
}
