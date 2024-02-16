import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from './product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productService:ProductService=inject(ProductService);
  productList:any=[];
  productForm!:FormGroup;
  isUpdatebtn!:boolean;
  queryValue:string|unknown;

  constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getProducts();
    this.productForm=this.fb.group({
      id:[],
      name:['',Validators.required],
      price:[,Validators.required],
      
    });
    this.route.paramMap.subscribe(x=>{
      this.queryValue=x.get('id');
    })
    if(this.queryValue!="" && this.queryValue!=null){
      //alert(this.queryValue)
    }
    this.isUpdatebtn=false;
    
    
  }

  get id(){
    return this.productForm.get('id');
  }
  get name(){
    return this.productForm.get('name');
  }
  get price(){
    return this.productForm.get('price');
  }

  getProducts(){
    this.productService.getProducts().subscribe(result=>{
      this.productList=result;
      console.log(this.productList);
    })
  }
  

  saveProduct(){
    let product=this.productForm.value;
    if(!this.isUpdatebtn){
      this.productService.saveProduct(product).subscribe(result=>{
      });
      
    }
    else{
      let id=parseInt(this.productForm.value.id);
      this.productService.updateProduct(product).subscribe(result=>{
      });
    }
    this.getProducts();
    this.productForm.reset();
    this.isUpdatebtn=false;
 
      
   }
   editProduct(emp:any){
    //  this.empForm.get('id')?.disable();
      this.isUpdatebtn=true;
      this.productForm.setValue({
        id:emp.id,
        name:emp.name,
        price:emp.price
      });
     
    }
    
    
    clearForm()
    {
      this.productForm.reset();
      this.isUpdatebtn=false;
    }

    deleteProduct(id:number |undefined){
      let response=confirm('Do you want to delete id '+id +' ?');
      if(response==true){
       this.productService.deleteProduct(id).subscribe(result=>{
       this.getProducts();
       });
      }
    }

    infoProduct(id:number){
      this.router.navigate(['/product-details',id]);

    }
    
   
  
}
  


