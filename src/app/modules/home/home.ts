export interface EstablishmentDTO {
    address: string;
    description: string;
    emails: string [];
    facebookPage: string;
    id: string;
    lat: number;
    lon: number;
    name: string;
    phones: string[];
    photos: string[];
    supportedCurrencies: supportedCurrenciesDTO[];
    supportedLanguages: supportedLanguagesDTO[];
    twitterAccount: string;
    type: string;
    videos: string[];
    website: string;
    workingHours: workingHoursDTO[];
}


export interface supportedCurrenciesDTO {
    code: string;
    name: string;
}

export interface supportedLanguagesDTO {
    code: string;
    name: string;
}
export interface workingHoursDTO {
    day: number;
    workingIntervals: workingIntervalsDTO[];
}

export interface workingIntervalsDTO {
    from: string
    to: string
}

export class AddVisitorRequest {
    name!: string;
}