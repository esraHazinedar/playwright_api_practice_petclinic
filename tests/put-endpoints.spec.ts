import { test } from "../utils/fixtures";
import { expect } from "../utils/custom-exptect";
import { getRandomPetTypeData } from "../utils/data-generator";
import { generatePetType } from "../utils/api-helpers"

test("TEST 01 - Update Pet Type", async ({ api }) => {
  const createdPetType = await generatePetType(api);

  await expect(createdPetType).shouldMatchSchema("pettyTypes", "postSinglePetObject");

  const petId = createdPetType.id;
  const updatedPetTypePayload = getRandomPetTypeData();

  console.log(createdPetType.name);

  await api
    .path(`/pettypes/${petId}`)
    .body(updatedPetTypePayload)
    .putRequest(204);

  const fetchedUpdatedPetType = await api
    .path(`/pettypes/${petId}`)
    .getRequest(200);

  expect(fetchedUpdatedPetType.name).shouldEqual(updatedPetTypePayload.name);

  await api
    .path(`/pettypes/${petId}`)
    .deleteRequest(204);
});

test("TEST 02 - Update Veterinarian Details", async ({ api }) => {
  const getVets = await api
    .path("/vets")
    .getRequest(200);

  await expect(getVets).shouldMatchSchema("vets", "getVets");

  const firstVet = getVets[0];
  const vetFirstSpecialty = firstVet.specialties || [];
  const vetId = firstVet.id;

  const getSpecialties = await api
    .path("/specialties")
    .getRequest(200);

  await expect(getSpecialties).shouldMatchSchema("specialties", "getSpecialties");

  const allAvailableSpecialtiesResponse = getSpecialties;

  const newSpecialty = allAvailableSpecialtiesResponse.find( (s) => !vetFirstSpecialty.some((v) => v.id === s.id));

  const updatedVetPayLoad = {
    ...firstVet,
    specialties: [newSpecialty]
  };

  await api
    .path(`/vets/${vetId}`)
    .body(updatedVetPayLoad)
    .putRequest(204);

  const updatedVet = await api
    .path(`/vets/${vetId}`)
    .getRequest(200);

  expect(updatedVet.specialties[0]).shouldEqual(newSpecialty);
});