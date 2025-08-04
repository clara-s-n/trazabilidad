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
  animal_id: string;
  breed: string;
  birth_date: string;
  owner_id: string;
  land_id: string;
  status: string;
  created_at: string;
  updated_at: string;
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
