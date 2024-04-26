
export class CreateProduct {
    name: string;
    description: string;
    price: string;
    stock: string;
    image_url: string;
}

export class UpdateProduct{
    name?: string;
    description?: string;
    price?: number;
    stock?:  number ;
    image_url?: string;
    status?: number;
    updatedAt?: Date;
} 