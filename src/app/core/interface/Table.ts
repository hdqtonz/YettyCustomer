import { Visitor } from "./Visitor";

export interface EstablishmentTable {
    allowYettyAppUsersToJoin: boolean;
    maxSeats:                 number;
    name:                     string;
    room:                     string;
    seatsTaken:               number;
    visitors:                 Visitor[];
}