import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from './employee.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet,HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeService:EmployeeService=inject(EmployeeService);
  employeeList:any=[];
  employeeForm!:FormGroup;
  isUpdatebtn!:boolean;
  queryValue:string|unknown;

  constructor(private fb:FormBuilder,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getEmployees();
    this.employeeForm=this.fb.group({
      id:[],
      name:['',Validators.required],
      salary:[,Validators.required],
      email:[,Validators.required],
      // department:[,Validators.required]
      
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
    return this.employeeForm.get('id');
  }
  get name(){
    return this.employeeForm.get('name');
  }
  get salary(){
    return this.employeeForm.get('salary');
  }
  get email(){
    return this.employeeForm.get('email');
  }
  // get department(){
  //   return this.employeeForm.get('department');
  // }

  getEmployees(){
    this.employeeService.getEmployee().subscribe(result=>{
      this.employeeList=result;
      console.log(this.employeeList);
    })
  }
  

  saveEmployee(){
    let product=this.employeeForm.value;
    if(!this.isUpdatebtn){
      this.employeeService.saveEmployee(product).subscribe(result=>{
      });
      
    }
    else{
      let id=parseInt(this.employeeForm.value.id);
      this.employeeService.updateEmployee(product).subscribe(result=>{
      });
    }
    this.getEmployees();
    this.employeeForm.reset();
    this.isUpdatebtn=false;
 
      
   }
   editEmployee(emp:any){
    //  this.empForm.get('id')?.disable();
      this.isUpdatebtn=true;
      this.employeeForm.setValue({
        id:emp.id,
        name:emp.name,
        price:emp.price
      });
     
    }
    
    
    clearForm()
    {
      this.employeeForm.reset();
      this.isUpdatebtn=false;
    }

    deleteEmployee(id:number |undefined){
      let response=confirm('Do you want to delete id '+id +' ?');
      if(response==true){
       this.employeeService.deleteEmployee(id).subscribe(result=>{
       this.getEmployees();
       });
      }
    }

  }
