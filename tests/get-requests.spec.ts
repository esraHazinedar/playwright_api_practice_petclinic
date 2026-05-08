import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';



test.describe('Automate individual GET edpoints', () => {

    test('Test 01- GET /pettypes', async ({ api }) => {
        const pettyTypesResponse = await api.path('/pettypes')
            .getRequest(200)
        await expect(pettyTypesResponse).shouldMatchSchema('pettyTypes', 'getPettyTypes')
    })

    test('Test 02- GET /vets', async ({ api }) => {
        const vetResponse = await api.path('/vets')
            .getRequest(200)
        await expect(vetResponse).shouldMatchSchema('vets', 'getVets')
        for (let i = 0; i < vetResponse.length; i++) {
            expect(vetResponse[i].id).not.toBeNull()
        }
    })

    test('Test 03- GET /owners', async ({ api }) => {
        const ownersResponse = await api.path('/owners')
            .getRequest(200)
        await expect(ownersResponse).shouldMatchSchema('owners', 'getOwners')

        for (const owner of ownersResponse) {
            for (const pet of owner.pets || []) {
                expect(pet.ownerId).shouldEqual(owner.id)
            }
        }
    })

    test('Test 04- GET /pets', async ({ api }) => {
        const petsResponse = await api.path('/pets')
            .getRequest(200)
        await expect(petsResponse).shouldMatchSchema('pets', 'getPets')
    })

    test('Test 05- GET /specialties', async ({ api }) => {
        const specialtiesResponse = await api.path('/specialties')
            .getRequest(200)
        await expect(specialtiesResponse).shouldMatchSchema('specialties', 'getSpecialties')
        const names = specialtiesResponse.map(s => s.name);
        expect(names).shouldEqual(['radiology', 'surgery', 'dentistry'])
    })

    test('Test 06- GET /visits', async ({ api }) => {
        const visitsResponse = await api.path('/visits')
            .getRequest(200)
        await expect(visitsResponse).shouldMatchSchema('visits', 'getVisits')


    })


})


test.describe('Automate a sequence for GET endpoints', () => {

    test('Test 01- GET /pettypes/{petTypeId}', async ({ api }) => {
        const pettyTypesResponse = await api.path('/pettypes')
            .getRequest(200);
        await expect(pettyTypesResponse).shouldMatchSchema('pettyTypes', 'getPettyTypes')
        const id = pettyTypesResponse[0].id;

        const singlePettyTypeResponse = await api.path(`/pettypes/${id}`)
            .getRequest(200);
        await expect(singlePettyTypeResponse).shouldMatchSchema('pettyTypes', 'getPettyTypesSingleObject');
        expect(singlePettyTypeResponse.id).shouldEqual(id)

    })

    test('Test 02- GET /vets/{vetId}', async ({ api }) => {
        const vetsResponse = await api.path('/vets')
            .getRequest(200);
        await expect(vetsResponse).shouldMatchSchema('vets', 'getVets')
        const id = vetsResponse[0].id;
        const singleVetResponse = await api.path(`/vets/${id}`)
            .getRequest(200);
        await expect(singleVetResponse).shouldMatchSchema('vets', 'getVetsSingleObject');
        expect(singleVetResponse.id).shouldEqual(id)

    })


    test('Test 03- GET /owners/{ownerId}', async ({ api }) => {
        const ownersResponse = await api.path('/owners')
            .getRequest(200);
        await expect(ownersResponse).shouldMatchSchema('owners', 'getOwners')
        const id = ownersResponse[0].id;
        const singleOwnerResponse = await api.path(`/owners/${id}`)
            .getRequest(200);
        await expect(singleOwnerResponse).shouldMatchSchema('owners', 'getOwnersSingleObject');
        expect(singleOwnerResponse.id).shouldEqual(id)

    })

    test('Test 04- GET /pets/{petId}', async ({ api }) => {
        const petsResponse = await api.path('/pets')
            .getRequest(200);
        await expect(petsResponse).shouldMatchSchema('pets', 'getPets')
        const id = petsResponse[0].id;
        const singlePetResponse = await api.path(`/pets/${id}`)
            .getRequest(200);
        await expect(singlePetResponse).shouldMatchSchema('pets', 'getPetsSingleObject');
        expect(singlePetResponse.id).shouldEqual(id)
    })

    test('Test 05- GET /specialties/{specialtyId}', async ({ api }) => {
        const specialtiesResponse = await api.path('/specialties')
            .getRequest(200);
        await expect(specialtiesResponse).shouldMatchSchema('specialties', 'getSpecialties')
        const id = specialtiesResponse[0].id;
        const singelSpecialtiesResponse = await api.path(`/specialties/${id}`)
            .getRequest(200);
        await expect(singelSpecialtiesResponse).shouldMatchSchema('specialties', 'getSpecialtiesSingleObject');
        expect(singelSpecialtiesResponse.id).shouldEqual(id)
    })

    test('Test 06- GET /visits/{visitId}', async ({ api }) => {
        const visitsResponse = await api.path('/visits')
            .getRequest(200);
        await expect(visitsResponse).shouldMatchSchema('visits', 'getVisits')
        const id = visitsResponse[0].id;
        const singelVisitResponse = await api.path(`/visits/${id}`)
            .getRequest(200);
        await expect(singelVisitResponse).shouldMatchSchema('visits', 'getVisitsSingleObject');
        expect(singelVisitResponse.id).shouldEqual(id);

    })


})



