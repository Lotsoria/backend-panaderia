export class CreateCustomers {
    nit: string;
    dpi: string;
    name: string;
    last_name: string;
    phone: string;
    email: string;
}

export class UpdatedCustomer {
    nit?: string;
    name?: string;
    dpi?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    status?: number
    updatedAt?: Date;
}