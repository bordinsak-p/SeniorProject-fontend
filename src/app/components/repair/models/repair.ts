export interface Repair {
    id: number;
    user_id: number;
    equipmentpk_id: number;
    request_date: string;
    image: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    users: Users;
    equipments: Equipments;
}

export interface Users {
    firstname: string;
    lastname: string;
    username: string;
}

export interface Equipments {
    equipment_id: string;
    equipment_name: string;
    budget_year: string;
}

