import { Profesor } from "./profesor";

export interface Curso {
    id: string;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    estatus: boolean;
    cupo: number;
    profesor: Profesor;
}