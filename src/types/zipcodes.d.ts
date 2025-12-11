declare module "zipcodes" {
  export interface ZipCodeData {
    zip: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
  }

  export function lookup(zip: string): ZipCodeData | undefined;
  export function lookupByName(city: string, state: string): ZipCodeData[];
  export function lookupByCoords(
    lat: number,
    lon: number,
    radius?: number
  ): ZipCodeData[];
  export function distance(
    zip1: string,
    zip2: string
  ): number | undefined;
  export function radius(
    zip: string,
    miles: number
  ): string[] | undefined;
  export function toMiles(kilometers: number): number;
  export function toKilometers(miles: number): number;
  export function random(): ZipCodeData;
}
