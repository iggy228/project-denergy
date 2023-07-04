import { Resource } from "../types/resource";

export const makeResourceString = (resource: Resource) => {
  return `${resource.name}: ${resource.value}/${resource.capacity}`;
};
