import {ProductType} from "./ProductType";

export class Product {
    public title: string;
    public imageUrl: string;
    public basePrice: number;
    public taxRate: number;
    public discountRate: number;
    public productType: ProductType;

    constructor(product: Product) {
        this.title = product.title;
        this.imageUrl = product.imageUrl;
        this.basePrice = product.basePrice;
        this.taxRate = product.taxRate;
        this.discountRate = product.discountRate;
        this.productType = product.productType;
    }

    public getPrice(): number {
        return Math.round((this.basePrice * (1 - this.discountRate)) * this.taxRate);
    }

    public getPriceWithoutTaxes(): number {
        return Math.round(this.basePrice * (1 - this.discountRate))
    }
}