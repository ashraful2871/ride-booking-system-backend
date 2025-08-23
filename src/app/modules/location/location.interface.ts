export interface ILocation {
  lat: number;
  lng: number;
  address: string;
}

export interface IRideLocation {
  pickupLocation: ILocation;
  destinationLocation: ILocation;
}
