import petTypeRequestJson from "../request-objects/POST-petType.json";
import petRequestJson from "../request-objects/POST_pet.json"
import vetRequestJson from "../request-objects/POST_vet.json";
import ownerRequestJson from "../request-objects/POST_owner.json";
import visitRequestJson from "../request-objects/POST_visit.json";
import specialtiesRequestJson from "../request-objects/POST_specialties.json"
import { faker } from "@faker-js/faker";

export function getRandomPetTypeData() {
  const petTypeRequest = structuredClone(petTypeRequestJson);
  petTypeRequest.name = faker.animal.horse();
  return petTypeRequest;
}

export function getRandomPetData() {
  const petRequest = structuredClone(petRequestJson);
  petRequest.name = faker.person.firstName();
  petRequest.birthDate = faker.date.birthdate().toISOString().split("T")[0];
  return petRequest;
}

export function getRandomVetData() {
  const vetRequest = structuredClone(vetRequestJson);
  vetRequest.firstName = faker.person.firstName();
  vetRequest.lastName = faker.person.lastName();
  return vetRequest;
}

export function getRandomOwnerData() {
  const ownerRequest = structuredClone(ownerRequestJson);
  ownerRequest.firstName = faker.person.firstName();
  ownerRequest.lastName = faker.person.lastName();
  ownerRequest.address = faker.location.streetAddress();
  ownerRequest.city = faker.location.city();
  ownerRequest.telephone = faker.string.numeric(10);
  return ownerRequest;
}

export function getRandomVisitdData() {
  const visitRequest = structuredClone(visitRequestJson);
  const now = new Date();
  const formattedDate = now.toISOString().split("T")[0];
  visitRequest.date = formattedDate;
  visitRequest.description = faker.lorem.word();
  return visitRequest;

}


export function getRandomSpecialty(){
  const specialtyRequest = structuredClone(specialtiesRequestJson)
  specialtyRequest.name = faker.string.alphanumeric(6)
  return specialtyRequest
}