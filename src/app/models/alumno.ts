import { Curso } from "./curso";

export interface Alumno {
    id: string;
    nombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    edad: number;
    genero: string;
    estatus: boolean;
    cursosInscrito: Curso[]
}