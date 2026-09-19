import { RequestHandler } from "../utils/request-handler";
import { createRandomPet, createRandomPetType } from "./data-generator";

export async function createPetType(api: RequestHandler) {
  const petTypeRequest = createRandomPetType();

  const response = await api
    .path("/pettypes")
    .body(petTypeRequest)
    .postRequest(201);

  return response;
}

export async function createPet(api: RequestHandler) {
  const petTypes = await api.path("/pettypes").getRequest(200);

  const randomType = petTypes[Math.floor(Math.random() * petTypes.length)];

  const petRequest = createRandomPet();

  const newPet = {
    ...petRequest,
    type: {
      name: randomType.name,
      id: randomType.id,
    },
  };

  return newPet;
}
