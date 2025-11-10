import axios, { AxiosInstance } from 'axios';
import { Character, Vehicle } from '@domain/entities/Character';

export class SwapiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = 'https://swapi.dev/api') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  async getCharacter(id: string): Promise<Character> {
    const response = await this.client.get<Character>(`/people/${id}`);
    return response.data;
  }

  async getVehicle(url: string): Promise<Vehicle> {
    const response = await this.client.get<Vehicle>(url);
    return response.data;
  }

  async getVehicles(urls: string[]): Promise<Vehicle[]> {
    const promises = urls.map((url) => this.getVehicle(url));
    return Promise.all(promises);
  }
}






