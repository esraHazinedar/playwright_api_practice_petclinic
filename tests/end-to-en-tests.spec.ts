import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';
import { createRandomOwner, createRandomPet, createRandomVisit, createRandomVet } from '../utils/data-generator';

test('Test- 01 - Create and Delete Veterinarian', async ({ api }) => {

    const newVet = createRandomVet()
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



test('Test- 02 -Create owner,pet and visit', async ({ api }) => {

    const randomOwner = createRandomOwner();
    const createOwnerResponse = await api
        .path('/owners')
        .body(randomOwner)
        .postRequest(201)
    expect(createOwnerResponse).shouldMatchSchema('owners', 'postOwner')
    const ownerId = createOwnerResponse.id;
     
    const getCreatedOwnerResponse = await api
        .path(`/owners/${ownerId}`)
        .getRequest(200)
    expect(ownerId).shouldEqual(getCreatedOwnerResponse.id)
    const getpettypesResponse = await api
        .path('/pettypes')
        .getRequest(200)

    const randomPetType = getpettypesResponse[Math.floor(Math.random() * getpettypesResponse.length)];
    const newRandomPet = createRandomPet()
    const postNewPet = {  ...newRandomPet, type: randomPetType, }
    const createPetToOwnerResponse = await api
        .path(`/owners/${ownerId}/pets`)
        .body(postNewPet)
        .postRequest(201)

    const petId = createPetToOwnerResponse.id;
    let getUpdatedOwner = await api
        .path(`/owners/${ownerId}`)
        .getRequest(200)

    const visitRequestPayLoad = createRandomVisit()
    const createVisitToPetResponse = await api
        .path(`/owners/${ownerId}/pets/${petId}/visits`)
        .body(visitRequestPayLoad)
        .postRequest(201)

    expect(createVisitToPetResponse).shouldMatchSchema('visits', 'postsingleVisitObject')
    const expectedVisitDate = createVisitToPetResponse.date;
    const expectedVisitDescription = createVisitToPetResponse.description;

    getUpdatedOwner = await api
        .path(`/owners/${ownerId}`)
        .getRequest(200)
    const actualVisitDate = getUpdatedOwner.pets[0].visits[0].date;
    const actualVisitDescription = getUpdatedOwner.pets[0].visits[0].description;
    expect(expectedVisitDate).shouldEqual(actualVisitDate)
    expect(expectedVisitDescription).shouldEqual(actualVisitDescription)

    const visitId = getUpdatedOwner.pets[0].visits[0].id;
    await api
        .path(`/visits/${visitId}`)
        .deleteRequest(204)

    getUpdatedOwner = await api
        .path(`/owners/${ownerId}`)
        .getRequest(200)
    const visitObjectAfterDeletion = getUpdatedOwner.pets[0].visits;
    expect(visitObjectAfterDeletion).shouldEqual([])

    await api
        .path(`/pets/${petId}`)
        .deleteRequest(204)

    getUpdatedOwner = await api
        .path(`/owners/${ownerId}`)
        .getRequest(200)
    const petObjectAfterDeletion = getUpdatedOwner.pets;
    expect(petObjectAfterDeletion).shouldEqual([])

    await api
        .path(`/owners/${ownerId}`)
        .deleteRequest(204)
    
    const getOwnersResponse = await api
        .path(`/owners/${ownerId}`)
        .getRequest(404)



    //        const getOwnersResponse = await api
    //         .path(`/owners`)
    //         .getRequest(200)
    // const exists = getOwnersResponse.some(
    //   owner => owner.id === ownerId
    // );
    //         expect(exists).toBe(false)

})


