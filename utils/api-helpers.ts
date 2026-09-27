
import { expect } from "../utils/custom-exptect";
import {generatePetBody,generatePetTypeBody} from "../utils/data-generator"

export async function generatePetToTheExisitingOwner(api, ownerId: number) {

  const getPetTypesResponse = await api
    .path('/pettypes')
    .getRequest(200)
  await expect(getPetTypesResponse).shouldMatchSchema("pettyTypes", "getPettyTypes");
  const petTypes = getPetTypesResponse;
  const randomIndex = Math.floor(Math.random() * petTypes.length);
  const randomPetType = petTypes[randomIndex];

   const petRequestObject = generatePetBody()
    petRequestObject.type.name = randomPetType.name;
    petRequestObject.type.id = randomPetType.id;
 
    const generatePetRequestToTheOwnerResponse = await api
    .path(`/owners/${ownerId}/pets`)
    .body(petRequestObject)
    .postRequest(201)

  return generatePetRequestToTheOwnerResponse





}


export async function generatePetType(api) {
  const petTypeRequestObject = generatePetTypeBody()
  
  const response = await api
    .path("/pettypes")
    .body(petTypeRequestObject)
    .postRequest(201);

  return response;
}


