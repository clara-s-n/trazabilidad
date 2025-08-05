import { Land } from "./land";
import { Tag } from "./tag";
import { User } from "./user";

export interface AnimalParams {
  animal_id: string; // UUID del predio
}

export interface Animal {
  id: string;
  breed: string;
  birth_date: string;
  owner_id: string;
  land_id: string;
  status: string;
}

export interface CompleteAnimal {
  id: string;
  breed: string;
  birth_date: string;
  owner_id: string;
  land_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  currentTag?: Tag | null; // Número de la caravana actual
  owner?: User,
  land?: Land,
}

export interface AnimalPost {
  breed: string;
  birth_date: string;
  owner_id: string;
  land_id: string;
  status: string;
}

export interface UpdateAnimal {
  breed?: string;
  birth_date?: string;
  owner_id?: string;
  land_id?: string;
  status?: string;
}

export interface AnimalHistorySchema {
  id: string;
  animal_id: string;
  modified: string;
  old_value?: string;
  new_value?: string;
  modified_by: string;
  modification_date: string;
}

export interface AnimalMovementSchema {
  id: string;
  animal_id: string;
  origin_land_id: string;
  destiny_land_id: string;
  date: string;
  details: string;
}

export interface AnimalHistoryWithUser extends AnimalHistorySchema {
  modified_by_id?: string;
  modified_by_email?: string;
}

export interface AnimalMovementWithLands extends AnimalMovementSchema {
  origin_land_name: string;
  origin_latitude: string;
  origin_longitude: string;
  destiny_land_name: string;
  destiny_latitude: string;
  destiny_longitude: string;
}
