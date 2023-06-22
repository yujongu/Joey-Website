export interface UserObjectType {
  name: string;
  wLoc: string;
  tempUnit: string;
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
