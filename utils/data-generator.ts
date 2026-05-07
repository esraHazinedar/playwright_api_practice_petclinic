import { stringify } from "node:querystring"
import petTypeRequestJson from "../request-objects/POST-petType.json"
import petRequestJson from "../request-objects/POST_pet.json"

import{faker} from '@faker-js/faker'

export function createRandomPetType(){ 
    const petTypeRequest = structuredClone(petTypeRequestJson)
    petTypeRequest.name = faker.animal.horse()
    return petTypeRequest
}


export function createRandomPet(){
    const petRequest = structuredClone(petRequestJson)
    petRequest.name = faker.person.firstName()
  
    
    return petRequest
}