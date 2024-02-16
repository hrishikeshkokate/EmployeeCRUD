import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{
  
  url:string="http://localhost:8080/employee/"
  url2:string="http://localhost:8080/department/"
constructor(private http:HttpClient) { }

public getEmployee():Observable<any>{
  return this.http.get<any>(this.url+"getallemployees");
  
}
public getDepartment():Observable<any>{
  return this.http.get<any>(this.url2+"getalldepartments");
  
}

public saveEmployee(employee:any):Observable<any>{
  return this.http.post<any>(this.url+"saveEmployee",employee).pipe(
    catchError(this.errorHandler)
  );
}

public updateEmployee(employee:any):Observable<any>{
  return this.http.put<any>(this.url+"updateEmployee",employee).pipe(
    catchError(this.errorHandler)
  );

}

public deleteEmployee(id:any):Observable<any>{
  return this.http.delete<any>(this.url+"deleteEmployee/"+id).pipe(
    catchError(this.errorHandler)
  );

}

errorHandler(error:any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(() => new Error(errorMessage));
}

}
