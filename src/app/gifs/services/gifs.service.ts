import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];
  private apiKey:string = '2Sx2WTzG2dLk2PPgKHRlwOq18VYLF4xH';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';

  public resultados:Gif[] = [];

  public lastImages:any = '';

  constructor(
    private _http:HttpClient
  ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];



    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    

   }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query:string = ''){

    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
                    .set('api_key',this.apiKey)
                    .set('limit', '10')
                    .set('q',query);

    

    this._http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe(
        (resp) =>{
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        }
      );

      

  }




}
