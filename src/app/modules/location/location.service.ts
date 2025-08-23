import { IRideLocation } from "./location.interface";
import { Location } from "./location.model";

const createLocation = async (payload: Partial<IRideLocation>) => {
  const location = await Location.create(payload);

  return location;
};
const allLocation = async () => {
  const location = await Location.find({});

  return location;
};

export const locationService = {
  createLocation,
  allLocation,
};
