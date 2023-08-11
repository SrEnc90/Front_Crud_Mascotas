export interface Mascota {
    id?: number,  //! va hacer opcional debido a que cuándo lo estemos creando el backend solo lo va a generar autoincremental
    nombre: string,
    edad: number,
    raza: string,
    color: string,
    peso: number
}