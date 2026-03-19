import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    isFeatured: boolean;
    category: string;
    price: bigint;
}
export interface backendInterface {
    addProduct(id: bigint, name: string, price: bigint, category: string, isFeatured: boolean): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    isEmailSubscribed(email: string): Promise<boolean>;
    subscribeNewsletter(email: string): Promise<void>;
}
