import petRequestPayload from "../request-objects/POST_pet.json"
import petRequestTypePayload from '../request-objects/POST-petType.json'
import { faker } from '@faker-js/faker'
import { expect } from "../utils/custom-exptect";

export async function generatePetToTheExisitingOwner(api, ownerId: number) {

  const getPetTypesResponse = await api
    .path('/pettypes')
    .getRequest(200)
  await expect(getPetTypesResponse).shouldMatchSchema("pettyTypes", "getPettyTypes");
  const petTypes = getPetTypesResponse;

  const randomIndex = Math.floor(Math.random() * petTypes.length);

  const randomPetType = petTypes[randomIndex];

  const petRequest = structuredClone(petRequestPayload)
  petRequest.name = faker.animal.petName()
  petRequest.birthDate = faker.date.birthdate({ min: 2000, max: 2025, mode: "year" }).toISOString().split("T")[0];
  petRequest.type.name = randomPetType.name;
  petRequest.type.id = randomPetType.id;


  const generatePetRequestToTheOwnerResponse = await api
    .path(`/owners/${ownerId}/pets`)
    .body(petRequest)
    .postRequest(201)

  return generatePetRequestToTheOwnerResponse

}


export async function generatePetType(api) {
  const petTypeRequest = structuredClone(petRequestTypePayload)
  petTypeRequest.name = faker.animal.petName()

  const response = await api
    .path("/pettypes")
    .body(petTypeRequest)
    .postRequest(201);

  return response;
}


