import { test } from "../utils/fixtures";
import { expect } from "../utils/custom-exptect";
import { generatePetType } from "../utils/api-helpers";
import { generatePetToTheExisitingOwner } from "../utils/api-helpers";

test("Test 01 - Create and Delete PetType", async ({ api }) => {
  const createdPetResponse = await generatePetType(api);
  await expect(createdPetResponse).shouldMatchSchema(
    "pettyTypes",
    "postSinglePetObject",
  );
  const petTypeId = createdPetResponse.id;
  const petTypeName = createdPetResponse.name;

  const getPetResponse = await api.path(`/pettypes/${petTypeId}`).getRequest(200);
  await expect(getPetResponse).shouldMatchSchema(
    "pettyTypes",
    "getPettyTypesSingleObject",
  );

  expect(petTypeId).shouldEqual(getPetResponse.id);
  expect(petTypeName).shouldEqual(getPetResponse.name);

  await api
    .path(`/pettypes/${petTypeId}`)
    .deleteRequest(204);
});

test("Test 02 - AddNew Pet to Existing Owner", async ({ api }) => {
  const getOwnersResponse = await api.path("/owners").getRequest(200);
  await expect(getOwnersResponse).shouldMatchSchema("owners", "getOwners");
  const firstOwner = getOwnersResponse[0];
  const initialCount = firstOwner.pets.length;

  const createdNewPetResponse = await generatePetToTheExisitingOwner(api, firstOwner.id);
  await expect(createdNewPetResponse).shouldMatchSchema("pets", "postPet");
  const newPetId = createdNewPetResponse.id;
  const newPetName = createdNewPetResponse.name;
  let getOwnerAfterResponse = await api
    .path(`/owners/${firstOwner.id}`)
    .getRequest(200);

  expect(getOwnerAfterResponse.pets.map((p) => p.name)).toContain(newPetName);
  expect(getOwnerAfterResponse.pets.map((p) => p.id)).toContain(newPetId);
  expect(getOwnerAfterResponse.pets.length).shouldEqual(initialCount + 1);

  await api.path(`/pets/${newPetId}`).deleteRequest(204);
  getOwnerAfterResponse = await api
    .path(`/owners/${firstOwner.id}`)
    .getRequest(200);

  expect(getOwnerAfterResponse.pets.map((p) => p.name)).not.toContain(
    newPetName,
  );
  expect(getOwnerAfterResponse.pets.map((p) => p.id)).not.toContain(newPetId);
  expect(getOwnerAfterResponse.pets.length).shouldEqual(initialCount);
});




