export interface Equipments {
    id: number;
    equipment_id: string;
    equipment_name: string;
    location_id: number;
    description: string;
    image: string;
    buget_year: string;
    created_at: string;
    updated_at: string;
    Location: Location;
}

export interface Location {
    location_name: string;
    branch_info: string;
    room_number: string;
}
