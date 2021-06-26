import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];
  private apiKey:string = '2Sx2WTzG2dLk2PPgKHRlwOq18VYLF4xH';

  public resultados:Gif[] = [];

  constructor(
    private _http:HttpClient
  ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    

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

    

    this._http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2Sx2WTzG2dLk2PPgKHRlwOq18VYLF4xH&q=${query}&limit=10`)
      .subscribe(
        (resp) =>{
          this.resultados = resp.data;
          
        }
      );

  }
}
