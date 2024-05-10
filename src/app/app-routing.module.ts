import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';

//Componentes
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  { path: '', redirectTo: 'listMascotas', pathMatch: "full" },
  { path: 'listMascotas', component: ListadoMascotaComponent },
  { path: 'agregarMascota', component: AgregarEditarMascotaComponent },
  { path: 'verMascota/:id', component: VerMascotaComponent }, //! Con el :id indicamos que ese id puede cambiar y se lo vamos a pasar al componente
  { path: 'editarMascota/:id', component: AgregarEditarMascotaComponent },
  { path: '**', redirectTo: 'listMascotas', pathMatch: "full" }, //! con el path: '**' indicamos que si la ruta no hace math con ningunos de los paths de arriba entonces redireccione a listMascota(Ojo: Debe estar al último de la lista)
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
