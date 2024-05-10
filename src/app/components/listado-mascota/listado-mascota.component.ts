import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

/*
! Servía para llenar la tabla y ver los estilos antes de hacer el backend
const listMascotas: Mascota[] = [
  {nombre: 'Ciro', edad: 6, raza: 'Golden', color: 'Dorado', peso: 10},
  {nombre: 'Dora', edad: 3, raza: 'Pitubll', color: 'Negro', peso: 9},
  {nombre: 'Sky', edad: 3, raza: 'Chihuaha', color: 'Marrón', peso: 2},
  {nombre: 'Firulais', edad: 5, raza: 'Char Pei', color: 'Negro', peso: 7},
  {nombre: 'Tukutín', edad: 2, raza: 'Cocker', color: 'Blanco', peso: 4},
  {nombre: 'Rocket', edad: 7, raza: 'Dálmata', color: 'Blaco', peso: 7},
];
*/
@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator; //! con el ! le indicamos que no es nulo y que por ende no es necesario colocarlo en el constructor
  @ViewChild(MatSort) sort!: MatSort; //! con el ! le indicamos al compilador de typescript que si o si se le va a asignar un valor
  
  //! Toda inyección de depedencia debería ir con el underline: _Nombre
  constructor(private _snackBar: MatSnackBar, private _mascotaService: MascotaService){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0)
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
  }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarMascota(id: number) {
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe(()=>{
      this.mensajeExito();
      this.loading = false;
      this.obtenerMascotas();
    });
  }

  mensajeExito() {
    this._snackBar.open('La mascota fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

  obtenerMascotas() {
    this.loading = true;
    /*
    ! Cuándo nosotros trabajamos con observables debemos suscribirnos y desuscribirnos al observable pero al trabajar con peticiones http ya lo hace por nosotros.
    */
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        this.loading = false;
        //console.log(data); //! la respuesta es devuelta en formato json
        this.dataSource.data = data;
      },
    error: (e) => {
      console.error(e);
      this.loading = false;
      alert('Opps ocurrió un error');
    },
    complete: () => console.info('complete') //!Cuándo utilizamos peticiones http no es necesario que nos desuscribamos. Nos damos cuenta en la consola imprime el complete
    });
  }

  
  
}
