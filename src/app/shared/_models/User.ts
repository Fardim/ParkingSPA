import { Photo } from "./Photo";
export interface User {
    id: number;
    username: string;
    email: string;
    gender: string;
    age: number;
    dateOfBirth: Date;
    created: Date;
    lastActive: Date;
    city: string;
    photoUrl: string;
    photos?: Photo[];
}
