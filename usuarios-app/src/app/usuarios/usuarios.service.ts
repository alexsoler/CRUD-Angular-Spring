import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Usuario } from './usuario';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = "http://localhost:8080/user/";

  getUsers(): Observable<Usuario[]> {
    return this.http.get(this.baseUrl).pipe(
      map((response: any) => response._embedded.user as Usuario[])
    )
  }

  getUser(id: string) : Observable<Usuario> {
    return this.http.get(this.baseUrl + id).pipe(
      map((response: any) => {
        let user = response as Usuario;
        const datePipe = new DatePipe("en-US");
        
        user.dateOfBirth = datePipe.transform(user.dateOfBirth, 'yyyy-MM-dd');
        console.log(user)
        return user;
      })
    )
  }

  createUser(user: Usuario): Observable<Usuario> {
    return this.http.post(this.baseUrl, user).pipe(
      map((response: any) => response as Usuario),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  updateUser(user: Usuario, id: string): Observable<Usuario> {
    return this.http.put(this.baseUrl + id, user).pipe(
      map((response: any) => response as Usuario)
    )
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete(this.baseUrl+id).pipe(
      map((response: any) => console.log(response))
    )
  }
}
