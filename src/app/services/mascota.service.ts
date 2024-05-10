import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private myAppUrl: string = environment.endpoint; //! lo hemos declarado en el archivo src/environments/environment.development
  private myApiUrl: string = 'api/Mascota/'

  constructor(private http:HttpClient) { }

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.myAppUrl}${this.myApiUrl}`, mascota);
  }

  updateMascota(id: number, mascota:Mascota): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, mascota);
  }
}
