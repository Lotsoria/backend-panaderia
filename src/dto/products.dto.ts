
export class CreateProduct {
    name: string;
    description: string;
    price: string;
    stock: string;
}

export class UpdateProduct{
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    status?: number;
    updatedAt?: Date;
}