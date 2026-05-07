import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';
import { getNewPet, getUpdatedPet } from '../utils/data-generator';



test('TEST 01 - Update Pet Type', async ({ api }) => {
    const petRequest = getNewPet()
    const petName = petRequest.name;

    const createdPetResponse = await api.path('/pettypes')
        .body({ "name": petName })
        .postRequest(201);
    await expect(createdPetResponse).shouldMatchSchema('pettyTypes', 'postSinglePetObject')
    expect(createdPetResponse.name).shouldEqual(petName)
    const petId = createdPetResponse.id;
    const update = getUpdatedPet()
    const petUpdatedName = update.name;


    const updatePetResponse = await api.path(`/pettypes/${petId}`)
        .body({ "name": petUpdatedName })
        .putRequest(204);

    const getPetResponse = await api.path(`/pettypes/${petId}`)
        .getRequest(200)

    expect(getPetResponse.name).shouldEqual(petUpdatedName)

    const deletePetrequest = await api.path(`/pettypes/${petId}`)
        .deleteRequest(204);

})



test('TEST 02 - Update Veterinarian Details', async ({ api }) => {

    const getVetResponse = await api.path('/vets')
        .getRequest(200);
    await expect(getVetResponse).shouldMatchSchema('vets', 'getVets')
    const getFirstVet = getVetResponse[0];
    const vetFirstSpecialty = getFirstVet.specialties[0];
    const vetFirstId = getFirstVet.id;
    const getSpecialtiesResponse = await api.path('/specialties')
        .getRequest(200);
    await expect(getSpecialtiesResponse).shouldMatchSchema('specialties', 'getSpecialties')
    const specialties = getSpecialtiesResponse;
    let currentspec = null;

    for (let i = 0; i < specialties.length; i++) {
        const spec = specialties[i];
        if (!vetFirstSpecialty || vetFirstSpecialty.length === 0) {
            currentspec = specialties[0];
            break;
        }
        if (vetFirstSpecialty.id === spec.id) {
            if (i + 1 < specialties.length) {
                currentspec = specialties[i + 1];
            } else {
                currentspec = specialties[0];
            }
            break;
        }
    }

    const updatedVet = { ...getFirstVet, specialties: [currentspec], };
    const putResponse = await api
        .path(`/vets/${vetFirstId}`)
        .body(updatedVet)
        .putRequest(204);
    const getVetUpdatedResponse = await api.path(`/vets/${vetFirstId}`)
        .getRequest(200);
    expect(getVetUpdatedResponse.specialties[0]).shouldEqual(currentspec)



})