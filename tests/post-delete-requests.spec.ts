import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';
import { getNewPet } from '../utils/data-generator';





test('Test 01 - Create and Delete PetType', async ({ api }) => {

      const petRequest = getNewPet()
      const petName = petRequest.name;

      const createdPetResponse = await api.path('/pettypes')
            .body({ "name": petName })
            .postRequest(201);

      await expect(createdPetResponse).shouldMatchSchema('pettyTypes', 'postSinglePetObject')

      expect(createdPetResponse.name).shouldEqual(petName)

      await new Promise(resolve => setTimeout(resolve, 1000));
      const petId = createdPetResponse.id;
      const getPetResponse = await api.path(`/pettypes/${petId}`)
            .getRequest(200);

      await expect(getPetResponse).shouldMatchSchema('pettyTypes', 'getPettyTypesSingleObject')

      expect(petId).shouldEqual(getPetResponse.id)
      expect(petName).shouldEqual(getPetResponse.name)

      await new Promise(resolve => setTimeout(resolve, 1000));
      const deletePetResponse = await api.path(`/pettypes/${petId}`)
            .deleteRequest(204)




})














