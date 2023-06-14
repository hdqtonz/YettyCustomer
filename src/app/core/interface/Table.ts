import { Visitor } from "./Visitor";

export interface Table {
    allowYettyAppUsersToJoin: boolean;
    maxSeats:                 number;
    name:                     string;
    room:                     string;
    seatsTaken:               number;
    visitors:                 Visitor[];
}