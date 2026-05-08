import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';
import {  getRandomPetName, getRandomPetType } from '../utils/data-generator';



test('Test 01 - Create and Delete PetType', async ({ api }) => {

      const petType = getRandomPetType()
      const petTypeName = petType.name;

      const createdPetResponse = await api.path('/pettypes')
            .body({ "name": petTypeName })
            .postRequest(201);

      await expect(createdPetResponse).shouldMatchSchema('pettyTypes', 'postSinglePetObject')
      expect(createdPetResponse.name).shouldEqual(petTypeName)
      const petId = createdPetResponse.id;
      const getPetResponse = await api.path(`/pettypes/${petId}`)
            .getRequest(200);
      await expect(getPetResponse).shouldMatchSchema('pettyTypes', 'getPettyTypesSingleObject')

      expect(petId).shouldEqual(getPetResponse.id)
      expect(petTypeName).shouldEqual(getPetResponse.name)

      const deletePetResponse = await api.path(`/pettypes/${petId}`)
            .deleteRequest(204)

})



test('Test 02 - AddNew Pet to Existing Owner', async ({ api }) => {

      let getOwnersResponse = await api.path('/owners')
            .getRequest(200)
      await expect(getOwnersResponse).shouldMatchSchema('owners', 'getOwners')
      const getPetTypesResponse = await api.path('/pettypes')
            .getRequest(200)

      await expect(getPetTypesResponse).shouldMatchSchema('pettyTypes', 'getPettyTypes')
      let firstOwner = getOwnersResponse[0];

      const randomType = getPetTypesResponse[Math.floor(Math.random() * getPetTypesResponse.length)];
      const randomPetType = randomType.name
      const randomPetId = randomType.id


      const pet = getRandomPetName()
      const newPetName = pet.name;
      const newPet = {
            ...pet,
            name: newPetName,
            type: {
                  name: randomPetType,
                  id: randomPetId
            }
      };

      const initialCount = firstOwner.pets.length;
      const createdNewPetResponse = await api.path(`/owners/${firstOwner.id}/pets`)
            .body(newPet)
            .postRequest(201)

      await expect(createdNewPetResponse).shouldMatchSchema('pets', 'postPet')
      const newPetId = createdNewPetResponse.id
      let getOwnerAfterResponse = await api.path(`/owners/${firstOwner.id}`)
            .getRequest(200)

      expect(getOwnerAfterResponse.pets.map(p => p.name)).toContain(newPetName);
      expect(getOwnerAfterResponse.pets.map(p => p.id)).toContain(newPetId);
      expect(getOwnerAfterResponse.pets.length).shouldEqual(initialCount + 1);

      const deleteCreatedPetResponse = await api.path(`/pets/${newPetId}`)
            .deleteRequest(204)
      getOwnerAfterResponse = await api.path(`/owners/${firstOwner.id}`)
            .getRequest(200)

      expect(getOwnerAfterResponse.pets.map(p => p.name)).not.toContain(newPetName);
      expect(getOwnerAfterResponse.pets.map(p => p.id)).not.toContain(newPetId);
      expect(getOwnerAfterResponse.pets.length).shouldEqual(initialCount);

})




















