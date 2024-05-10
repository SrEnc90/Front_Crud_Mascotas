import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit, OnDestroy {
  id!: number;
  // mascota!: Mascota; //! utilizando pipe async
  mascota$! : Observable<Mascota> //* utilizando pipe async
  loading: boolean = false; //! Se utiliza en el método comentado obtenerMascota

  routeSub!: Subscription

  constructor(private _mascotaService: MascotaService,
    private aRoute: ActivatedRoute) {
      /*
      ! Si te das cuenta en el console log te devuelve el id en color blanco, esto quiere decir que es de tipo string
      ! cuándo es de color azul es de tipo number
      */
      const id2 = aRoute.snapshot.paramMap.get('id');
      console.log(id2);
      //! 3 Formas para parsear a tipo number
      //const id = +aRoute.snapshot.paramMap.get('id')!; //! Ponemos el + para parsearlo a tipo int y el ! para indicarle que si o si va a recibir un valor
      // const id = parseInt(aRoute.snapshot.paramMap.get('id')!);
      //! Esta no es la manera correcta ya que ejecuta una sola vez y al comienzo y si yo coloco un input para q me se muestre otra mascota con otro id no va renderizar
      //! mejor se coloca en el ngOnInit
      //this.id = Number(aRoute.snapshot.paramMap.get('id')); 
      //console.log(this.id); //! imprime de color azul
    }
  /*
  ! El constructor siempre se ejecuta primero y solo una vez antes que el ngOnInit (Se ejecuta segundo)
  */
 //! Lo vamos hacer de otra forma en la vista también hemos comentado: <div *ngIf="mascota !== null" class="container">
   //ngOnInit(): void {
  //   this.obtenerMascota();
  //}
  // obtenerMascota() {
  //this.boolean = true;
  //   this._mascotaService.getMascota(this.id).subscribe(data => this.mascota = data);
  //this.boolean = false;
  // }

  //* Otra forma con pipe async
  ngOnInit(): void {
    //! Se debe primero traer el id y de ahí enviarlo al servicio
    this.routeSub = this.aRoute.params.subscribe(data => {
      this.id = data['id'];
      console.log(data);
    this.mascota$ = this._mascotaService.getMascota(this.id);
    })
  }

  /*
  ! Siempre que utilizamos subscriciones debemos destruirlas, a excepción de cuándo hacemos peticiones http
  */
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
