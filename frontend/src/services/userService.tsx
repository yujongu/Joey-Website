export class UserService {
  public async addUser(user: any) {
    const response = await fetch(`/api/v1/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });
    
    return response;
  }
}
