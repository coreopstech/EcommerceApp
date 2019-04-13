export class Cart {
  ProductDetailsId: number;
  EncryptedProductDetailsId:string;
  ProductQuantity:number;
  IsSavedForLater:boolean;
    
    constructor(ProductDetailId: number, ProductDetailsEncryptedId: string, ProductQuantity: number,IsSavedForLater:boolean) {
        this.ProductDetailsId = ProductDetailId;
        this.EncryptedProductDetailsId = ProductDetailsEncryptedId;
        this.ProductQuantity = ProductQuantity;
        this.IsSavedForLater=IsSavedForLater;
      }
}