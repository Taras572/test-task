import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }


export interface Product {
  id?: string,
  imageUrl: string,
  name: string,
  count: number,
  size: Size,
  weight: string,
  comments: Comments
}

interface Size {
  width: number,
  heigth: number
}

interface Comments {
  id?: string,
  productId: string,
  description: string,
  date: string
}
