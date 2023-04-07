import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Database, update } from '@angular/fire/database';
import { ref, set, onValue, remove, child, push } from "firebase/database";
import { uploadBytes } from "firebase/storage";
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product/product.module';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

    public productForm!: UntypedFormGroup;
    public editStatus: boolean = false;

    public product: Array<any> = [];

    public editProductID!: any;
    public image: string = '';
    public imgt!: string;


    constructor(
        private fb: UntypedFormBuilder,
        private toastr: ToastrService,
        public productService: ProductService,
        public db: Database
    ) {

    }

    ngOnInit(): void {
        this.initProduct();
        this.loadCategory();
    }


    initProduct(): void {
        this.productForm = this.fb.group({
            name: [null, Validators.required],
            count: [null, Validators.required],
            weight: [null, Validators.required],
            size: this.fb.group({
                width: [null, Validators.required],
                heigth: [null, Validators.required],
            }),
            imageUrl: [null, Validators.required]
        });
        this.image = '';
        this.imgt = '';
    }

    loadCategory(): void {
        const starCountRef = ref(this.db, 'product/');
        onValue(starCountRef, (snapshot) => {
            this.product = Object.values(snapshot.val());
            //sort for count
            this.product.sort((x, y) => x.count - y.count);
        });


    }

    uploadFile(event: any): void {
        const file = event.target.files[0];
        this.productService.upload(file);
        const task = uploadBytes(this.productService.upload(file), file).then((snapshot) => {
            this.productService.getFile(file)
                .then((img) => {
                    this.image = img;
                    this.productForm.patchValue({
                        imageUrl: this.image
                    });
                });
        });

    };


    createProduct(): void {
        const newPostKey = push(child(ref(this.db), 'product')).key?.substring(1);
        const prod: Product = this.productForm.value;
        prod.id = newPostKey;
        set(ref(this.db, 'product/' + newPostKey), prod)
            .then(() => {
                console.log('Data saved successfully!');
                this.initProduct();
                this.image = '';
                this.imgt = '';
            })
            .catch((error) => {
                console.log(error);
            });
    }


    saveProduct() {
        const newPostKey = this.editProductID;
        const categ = this.productForm.value;
        categ.id = newPostKey;
        update(ref(this.db, 'product/' + newPostKey), categ)
            .then(() => {
                console.log('Data saved successfully!');
            })
            .catch((error) => {
                console.log(error);
            });
        this.initProduct();
        this.image = '';
        this.imgt = '';
    }


    editProduct(product: any): void {
        this.image = product.imageUrl;
        this.productForm.patchValue({
            name: product.name,
            count: product.count,
            weight: product.weight,
            imageUrl: product.imageUrl,
            size: {
                width: '222',
                heigth: '333',
            },
        });
        this.editProductID = product.id;
    }


    removeProduct(): void {
        if (this.product.length == 1) {
            set(ref(this.db, 'product/'), '')
                .then(() => {
                    this.showSuccess();
                })
                .catch((error) => {
                    console.log(error);

                });
        }
        else {
            remove(ref(this.db, 'product/' + this.editProductID));
            this.showSuccess();
        }
    }

    showSuccess(): void {
        this.toastr.success('Delete success');
        this.initProduct()
    }

}
