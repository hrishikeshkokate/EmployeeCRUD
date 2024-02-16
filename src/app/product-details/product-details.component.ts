import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterOutlet,HttpClientModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productid:string|unknown;

  constructor(private route:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    this.productid=this.route.snapshot.paramMap.get('id');
    if(this.productid!=''){
    alert(this.productid);
    }
  }

  goBack(){
    this.router.navigate(['/product',{id:this.productid}]);
  }

}
