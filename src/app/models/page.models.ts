import { Admins } from "./admins.models";
import { Class } from "./class.model";
import { Profs } from "./profs.models";

export interface PageProf {
    content:          Profs[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;  
}
export interface PageAdmin {
    content:          Admins[];
     
}

export interface PageClasse {
    content:          Class[];
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    numberOfElements: number;
    }
    