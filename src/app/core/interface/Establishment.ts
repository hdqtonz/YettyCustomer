export interface Establishment {
  address: string;
  description: string;
  emails: string[];
  facebookPage: string;
  id: string;
  lat: number;
  lon: number;
  name: string;
  phones: string[];
  photos: string[];
  supportedCurrencies: Supported[];
  supportedLanguages: Supported[];
  twitterAccount: string;
  type: string;
  videos: string[];
  website: string;
  workingHours: WorkingHour[];
}

export interface Supported {
  code: string;
  name: string;
}

export interface WorkingHour {
  day: number;
  workingIntervals: WorkingInterval[];
}

export interface WorkingInterval {
  from: string;
  to: string;
}
