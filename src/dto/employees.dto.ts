export class CreateEmployee{
    dpi: string;
    name: string;
    last_name: string;
    phone: string;
    email: string;
}

export class UpdateEmployee{
    dpi?: string;
    name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    status?: number;
    updatedAt?: Date;
}
