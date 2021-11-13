import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../Model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Model/profile';
import { Useredit } from '../Model/upload';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = 'https://localhost:5001/api/ApplicationUser/register';
  baseUrl2 = 'https://localhost:5001/api/UserProfile';
  baseUrl3 = 'https://localhost:5001/api/ApplicationUser/Login';
  baseUrl4 = 'https://localhost:5001/api/blogs1';
  baseUrl5 = 'https://localhost:5001/api/expo';
  baseUrl6 = 'https://localhost:5001/api/blogs1/post';
  baseUrl7 = 'https://localhost:5001/api/comments';
  baseUrl8 = 'https://localhost:5001/api/blogs1/put';


userida: number;

private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
private imageStatus = new BehaviorSubject<boolean>(this.checkImageStatus());
ImageStatus$: Observable<boolean>;
login(loginData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl3}/`, loginData).pipe(
      
      map(result => {
        
        // login successful if there's a jwt token in the response
        if (result && result.token)
        {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.getUserProfile();
            this.checkImageStatus();
            this.loginStatus.next(true);
            localStorage.setItem('loginStatus', '1');
            localStorage.setItem('token', result.token);

        }

        return result;


      })

      );
  }
  logout()
    {
        // Set Loginstatus to false and delete saved jwt cookie
        this.loginStatus.next(false);
        this.imageStatus.next(false);
        localStorage.removeItem('token');
        localStorage.removeItem('image');
        localStorage.setItem('loginStatus', '0');
        localStorage.setItem('imageStatus', '0');
        this.router.navigate(['/login']);
        console.log('Logged Out Successfully');

    }

    getBlogByUser(): Observable<ApiResponse[]> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.get<ApiResponse[]>(`${this.baseUrl4}/`, httpOptions );
    }
    getBlog(): Observable<ApiResponse[]> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.get<ApiResponse[]>(`${this.baseUrl5}/`, httpOptions );
    }
    getBlogById(id: number): Observable<ApiResponse[]> {
      return this.http.get<ApiResponse[]>(`${this.baseUrl4}/${id}`);
     }
    getCommentById(id: number): Observable<ApiResponse[]> {
      return this.http.get<ApiResponse[]>(`${this.baseUrl7}/${id}`);
     }

    addUser(id: number): Observable<ApiResponse> {
      const httpOptions = {  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<ApiResponse>(`${this.baseUrl}/`, id, httpOptions);
    }
    getUserProfile(): Observable<ApiResponse> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.get<ApiResponse>(`${this.baseUrl2}/`, httpOptions ).pipe(

        map(user => {

          if (user.image != null)
          {
                this.imageStatus.next(true);
                localStorage.setItem('imageStatus', '1');
                localStorage.setItem('image', user.image);

          }

          return user;


        })
        );
    }

    getUserById(id: number): Observable<ApiResponse[]> {
      return this.http.get<ApiResponse[]>(`${this.baseUrl5}/${id}`);
     }

     createBlog(id: number): Observable<ApiResponse> {
      const httpOptions = {  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
      return this.http.post<ApiResponse>(`${this.baseUrl6}/`,id, httpOptions);
    }
     comment(id: number): Observable<ApiResponse> {
      const httpOptions = {  headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
      return this.http.post<ApiResponse>(`${this.baseUrl7}/`, id, httpOptions);
    }

     deleteBlog(id: number): Observable<ApiResponse[]> {
      return this.http.delete<ApiResponse[]>(`${this.baseUrl4}/${id}`);
    }

    updateBlog(user: Useredit): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${this.baseUrl8}/${user.Id}`, user);
    }
    updateBlogImage(user: Useredit): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${this.baseUrl8}/${user.Id}`, user);
    }

    checkLoginStatus(): boolean
  {

      // tslint:disable-next-line: prefer-const
      var loginCookie = localStorage.getItem('loginStatus');
      if (loginCookie == '1')
        {

            return true;

        }
      return false;
       }

       get isLoggesIn()
       {
           return this.loginStatus.asObservable();
       }
    checkImageStatus(): boolean
  {

      // tslint:disable-next-line: prefer-const
      var imageCookie = localStorage.getItem('imageStatus');
      if (imageCookie == '1')
        {

            return true;

        }
      return false;
       }

       get isImageIn()
       {
           return this.imageStatus.asObservable();
       }

}
