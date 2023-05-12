export class WeatherService {
  public async getWeather(): Promise<any> {
    try {
      const response = await fetch("/api/v1/weather/currentWeather");
      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // public async addUser(user: any) {
  //     const response = await fetch(`/api/user`, {
  //         method: 'POST',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({user})
  //       })
  //     return await response.json();
  // }
}
