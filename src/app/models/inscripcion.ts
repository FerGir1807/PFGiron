import { Curso } from "./curso";

export interface Inscripcion {
    idAlumno: string;
    nombreAlumno: string;
    cursosInscrito: Curso[]
}