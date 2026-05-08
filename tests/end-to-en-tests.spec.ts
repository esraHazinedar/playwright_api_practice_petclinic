import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';
import { getRandomVet } from '../utils/data-generator';

test('Test- 01 - Create and Delete Veterinarian', async ({ api }) => {

    const newVet = getRandomVet()
    const vetName = newVet.firstName;
    const vetSurname = newVet.lastName;

    let vet = {
        ...newVet,
        firstName: vetName,
        lastName: vetSurname,
        specialties: []
    }
    const postVetResponse = await api
        .path('/vets')
        .body(vet)
        .postRequest(201)
    const vetId = postVetResponse.id;
    const createSpecialty = {
        name: "pediatry"
    }
    const createdSpecialtyResponse = await api
        .path('/specialties')
        .body(createSpecialty)
        .postRequest(201)
    await expect(createdSpecialtyResponse).shouldMatchSchema('specialties', 'getSpecialtiesSingleObject')
    const specialtyId = createdSpecialtyResponse.id;
    const specialtyName = createdSpecialtyResponse.name;
    vet = {
        ...postVetResponse,
        specialties: [
            { id: specialtyId, name: specialtyName }],
    };
    await api
        .path(`/vets/${vetId}`)
        .body(vet)
        .putRequest(204);
    let getUpdatedVetResponse = await api
        .path(`/vets/${vetId}`)
        .getRequest(200)
    expect(getUpdatedVetResponse.specialties[0].id).shouldEqual(specialtyId)
    expect(getUpdatedVetResponse.specialties[0].name).shouldEqual(specialtyName)
    await api
        .path(`/specialties/${specialtyId}`)
        .deleteRequest(204)
    getUpdatedVetResponse = await api.path(`/vets/${vetId}`)
        .body(vet)
        .getRequest(200)
    expect(getUpdatedVetResponse.specialties.length).shouldEqual(0)
    await api
        .path(`/vets/${vetId}`)
        .deleteRequest(204)

    const getVetsResponse = await api
        .path('/vets')
        .getRequest(200)

    const vetExists = getVetsResponse.some(vet => vet.id === vetId);
    expect(vetExists).shouldEqual(false)


})



