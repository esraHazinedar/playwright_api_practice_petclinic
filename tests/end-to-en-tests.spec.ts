import { test } from "../utils/fixtures";
import { expect } from "../utils/custom-exptect";
import { generateOwnerBody, generateVisitBody, generateVetBody, generateSpecialtyBody } from "../utils/data-generator";
import { generatePetToTheExisitingOwner } from "../utils/api-helpers"

test("Test- 01 - Create and Delete Veterinarian", async ({ api }) => {
  let newVetRequestBody = generateVetBody();
  newVetRequestBody.specialties = []

  const postVetResponse = await api
    .path("/vets")
    .body(newVetRequestBody)
    .postRequest(201);
  await expect(postVetResponse).shouldMatchSchema("vets", "postVetSingleObject");
  const vetId = postVetResponse.id;
  const specialtyRequestBody = generateSpecialtyBody()

  const createdSpecialtyResponse = await api
    .path("/specialties")
    .body(specialtyRequestBody)
    .postRequest(201);
  await expect(createdSpecialtyResponse).shouldMatchSchema("specialties", "postSpecialtiesSingleObject");
  let specialtyId = createdSpecialtyResponse.id;
  const specialtyName = createdSpecialtyResponse.name;

  newVetRequestBody = {
    ...postVetResponse,
    specialties: [{ id: specialtyId, name: specialtyName }]
  };

  await api
    .path(`/vets/${vetId}`)
    .body(newVetRequestBody)
    .putRequest(204);

  let getUpdatedVetResponse = await api
    .path(`/vets/${vetId}`)
    .getRequest(200);
  await expect(getUpdatedVetResponse).shouldMatchSchema("vets", "getVetsSingleObject");
  expect(getUpdatedVetResponse.specialties[0].id).shouldEqual(specialtyId);
  expect(getUpdatedVetResponse.specialties[0].name).shouldEqual(specialtyName);

  await api
    .path(`/specialties/${specialtyId}`)
    .deleteRequest(204);

  getUpdatedVetResponse = await api
    .path(`/vets/${vetId}`)
    .getRequest(200)
  await expect(getUpdatedVetResponse).shouldMatchSchema('vets', 'getVetsSingleObject')
  expect(getUpdatedVetResponse.specialties.length).shouldEqual(0)
  expect(getUpdatedVetResponse.specialties.map((s) => s.id)).not.toContain(specialtyId);

  await api
    .path(`/vets/${vetId}`)
    .deleteRequest(204)

  const getVetsResponse = await api
    .path('/vets')
    .getRequest(200)
  await expect(getVetsResponse).shouldMatchSchema('vets', 'getVets')
  const isVetExist = getVetsResponse.some(vet => vet.id === vetId);
  expect(isVetExist).shouldEqual(false)

});



test("Test- 02 -Create owner,pet and visit", async ({ api }) => {
  const ownerCreateRequestBody = generateOwnerBody();
  const createOwnerResponse = await api
    .path("/owners")
    .body(ownerCreateRequestBody)
    .postRequest(201);
  await expect(createOwnerResponse).shouldMatchSchema("owners", "postOwnerSingleObject");
  const ownerId = createOwnerResponse.id;

  const getCreatedOwnerResponse = await api
    .path(`/owners/${ownerId}`)
    .getRequest(200);
  await expect(getCreatedOwnerResponse).shouldMatchSchema("owners", "getOwnersSingleObject");
  expect(ownerId).shouldEqual(getCreatedOwnerResponse.id);
  const createPetToOwnerResponse = await generatePetToTheExisitingOwner(api, ownerId)
  await expect(createPetToOwnerResponse).shouldMatchSchema("pets", "postPetToOwner");
  const petId = createPetToOwnerResponse.id;

  let getUpdatedOwner = await api
    .path(`/owners/${ownerId}`)
    .getRequest(200);
  await expect(getUpdatedOwner).shouldMatchSchema("owners", "getOwnersSingleObject");
  expect(getUpdatedOwner.pets.some((pet) => pet.id === petId)).shouldEqual(true);
  const visitRequestPayLoad = generateVisitBody();

  const createVisitToPetResponse = await api
    .path(`/owners/${ownerId}/pets/${petId}/visits`)
    .body(visitRequestPayLoad)
    .postRequest(201);
  await expect(createVisitToPetResponse).shouldMatchSchema("visits", "postVisitSingleObject");
  const expectedVisitDate = createVisitToPetResponse.date;
  const expectedVisitDescription = createVisitToPetResponse.description;

  getUpdatedOwner = await api
    .path(`/owners/${ownerId}`)
    .getRequest(200);
  await expect(getUpdatedOwner).shouldMatchSchema("owners", "getOwnersSingleObject");
  const createdPet = getUpdatedOwner.pets.find((pet) => pet.id === petId);
  const createdVisit = createdPet?.visits.find((visit) => visit.id === createVisitToPetResponse.id);
  const actualVisitDate = createdVisit?.date;
  const actualVisitDescription = createdVisit?.description;
  expect(expectedVisitDate).shouldEqual(actualVisitDate);
  expect(expectedVisitDescription).shouldEqual(actualVisitDescription);
  const visitId = createdVisit?.id;

  await api.path(`/visits/${visitId}`).deleteRequest(204);

  getUpdatedOwner = await api
    .path(`/owners/${ownerId}`)
    .getRequest(200);
  const visitObjectAfterDeletion = getUpdatedOwner.pets.find((pet) => pet.id === petId)?.visits;
  expect(visitObjectAfterDeletion).shouldEqual([]);
  await expect(getUpdatedOwner).shouldMatchSchema("owners", "getOwnersSingleObject");
  await api.path(`/pets/${petId}`).deleteRequest(204);

  getUpdatedOwner = await api
    .path(`/owners/${ownerId}`)
    .getRequest(200);
  await expect(getUpdatedOwner).shouldMatchSchema("owners", "getOwnersSingleObject");
  const petObjectAfterDeletion = getUpdatedOwner.pets;
  expect(petObjectAfterDeletion).shouldEqual([]);
  await api.path(`/owners/${ownerId}`).deleteRequest(204);
  await api.path(`/owners/${ownerId}`).getRequest(404);
});


