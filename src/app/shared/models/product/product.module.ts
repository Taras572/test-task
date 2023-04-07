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
  size: {
    width: string,
    height: string
  },
  weight: string,
  comments: [string, string]
}
