import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';
import { generateRandomPetTypeRequest } from '../utils/data-generator';



test('TEST 01 - Update Pet Type', async ({ api }) => {
    const randomPetType = generateRandomPetTypeRequest()

    const createdPetType = await api.path('/pettypes')
        .body(randomPetType)
        .postRequest(201);
    await expect(createdPetType).shouldMatchSchema('pettyTypes', 'postSinglePetObject')
    expect(createdPetType.name).shouldEqual(randomPetType.name)
    const petId = createdPetType.id;
    const updatedPetTypePayload = generateRandomPetTypeRequest()

    await api.path(`/pettypes/${petId}`)
        .body(updatedPetTypePayload)
        .putRequest(204);

    const fetchedUpdatedPetType = await api
        .path(`/pettypes/${petId}`)
        .getRequest(200)
    expect(fetchedUpdatedPetType.name).shouldEqual(updatedPetTypePayload.name)

    const deletePetTypeResponse = await api
        .path(`/pettypes/${petId}`)
        .deleteRequest(204);

})



test('TEST 02 - Update Veterinarian Details', async ({ api }) => {

    const getVets = await api
        .path('/vets')
        .getRequest(200);

    await expect(getVets).shouldMatchSchema('vets', 'getVets')
    const firstVet = getVets[0];
    const vetFirstSpecialty = firstVet.specialties || [];
    const vetId = firstVet.id;

    const getSpecialties = await api
        .path('/specialties')
        .getRequest(200);
    await expect(getSpecialties).shouldMatchSchema('specialties', 'getSpecialties')
    const specialties = getSpecialties;
    const newSpecialty = specialties.find(s => !vetFirstSpecialty.some(v => v.id === s.id));
    const updatedVetPayLoad = { ...firstVet, specialties: [newSpecialty], };

    await api
        .path(`/vets/${vetId}`)
        .body(updatedVetPayLoad)
        .putRequest(204);

    const updatedVet = await api
        .path(`/vets/${vetId}`)
        .getRequest(200);
    expect(updatedVet.specialties[0]).shouldEqual(newSpecialty)

})