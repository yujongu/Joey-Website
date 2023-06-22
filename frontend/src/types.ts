export interface UserObjectType {
  name: string;
  wLoc: string;
  tempUnit: string;
}

export interface UserProfileObjectType {
  name: string;
  phrase: string;
  location: string;
  tempUnit: string;
  LinkedIn: string;
  Instagram: string;
  Facebook: string;
  YouTube: string;
}

export interface WeatherObjectType {
  location: string;
  locationKr: string;
  locationEn: string;
  weatherName: string;
  weatherDescription: string;
  weatherIcon: string;
  temperature: number;
  feelsLike: number;
  tempUnit: string;
}

export type NamecardProps = {
  name: string;
  phrase: string;
};
