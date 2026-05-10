import petTypeRequestJson from "../request-objects/POST-petType.json"
import petRequestJson from "../request-objects/POST_pet.json"
import vetRequestJson from "../request-objects/POST_vet.json"
import ownerRequestJson from "../request-objects/POST_owner.json"
import visitRequestJson from "../request-objects/POST_visit.json"
import { faker } from '@faker-js/faker'

export function createRandomPetType() {
    const petTypeRequest = structuredClone(petTypeRequestJson)
    petTypeRequest.name = faker.animal.horse()
    return petTypeRequest
}


export function createRandomPet() {
    const petRequest = structuredClone(petRequestJson)
    petRequest.name = faker.person.firstName()
    petRequest.birthDate = faker.date.birthdate().toISOString().split('T')[0];
    return petRequest
}


export function createRandomVet() {
    const vetRequest = structuredClone(vetRequestJson)
    vetRequest.firstName = faker.person.firstName()
    vetRequest.lastName = faker.person.lastName()
    return vetRequest

}


export function createRandomOwner() {
    const ownerRequest = structuredClone(ownerRequestJson)
    ownerRequest.firstName = faker.person.firstName();
    ownerRequest.lastName = faker.person.lastName();
    ownerRequest.address = faker.location.streetAddress();
    ownerRequest.city = faker.location.city()
    ownerRequest.telephone = faker.string.numeric(10);
    return ownerRequest

}

export function createRandomVisit() {
    const visitRequest = structuredClone(visitRequestJson)
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    visitRequest.date = formattedDate;
    visitRequest.description = faker.lorem.word();
    return visitRequest

}