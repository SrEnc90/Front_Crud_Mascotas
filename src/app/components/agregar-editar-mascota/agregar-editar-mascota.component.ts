import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {

  loading:boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required], //el primer item es el valor inicial que quieres que se muestre en la vista y el segundo es una validación
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required]
    })

    this.id=Number(this.aRoute.snapshot.paramMap.get('id')); // Para obtener el id y en base a eso enviar el título de la vista, y al parsearlo como number si no trae nada me devuelve 0
  }
  ngOnInit(): void {
    if(this.id !== 0) this.operacion = 'Editar';
    this.obtenerMascota(this.id);
  }

  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data => {
      //! La diferencia entre setValue y patchValue es que el primero tengo que pasarle todo el objeto mientras que al segundo solo lo que vamos a modificar
      this.form.setValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      })  
      // this.form.patchValue({
      //   nombre: data.nombre
      // })  
    });
    this.loading = false;
  }

  agregarEditarMascota() {
    console.log(this.form); //Ver que existe una propiedad llamada invalid, por lo que desabilitamos el botón de aceptar si invalid es true
    //! Formas de Obtener el valor del formulario:
    const nombre2 = this.form.get('nombre')?.value; //Se coloca el signo ? para quitar el error del objeto puede ser nullable
    const nombre3 = this.form.value.nombre;
    console.log('Formas de obtener el valor:\n' + '1era ' + nombre2 + '\n2da ' + nombre3);
    
    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso,
    }

    if(this.id != 0) {
      mascota.id = this.id;
      this.editarMascota(this.id, mascota);
    }
    else 
      this.agregarMascota(mascota);
  }
  
  agregarMascota(mascota: Mascota) {
    // Enviamos el objeto al Back End
    this._mascotaService.addMascota(mascota).subscribe(data => {
      console.log(data);
      this.mensajeExito('registrada');
      this.router.navigate(['/listMascotas']);
    });
  }

  editarMascota(id: number,mascota: Mascota) {
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(data => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/listMascotas']);
    });
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`La mascota fue ${texto} con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
