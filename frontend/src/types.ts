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

export interface KakaoResultObjectType {
  place_name: string;
  address_name: string;
  category_name: string;
  category_group_name: string;
  id: string;
  road_address_name: string;
  xCoor: string;
  yCoor: string;
}
