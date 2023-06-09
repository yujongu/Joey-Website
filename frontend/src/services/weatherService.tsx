export class WeatherService {
  public async getWeather(location: string, tempUnit: string): Promise<any> {
    try {
      const response = await fetch(
        `/api/v1/weather/currentWeather/${location}/${tempUnit}`
      );
      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
