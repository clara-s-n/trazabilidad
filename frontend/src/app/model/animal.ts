export interface AnimalParams {
  animal_id: string; // UUID del predio
}

export interface Animal {
  animal_id: string;
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
