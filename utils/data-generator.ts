import { stringify } from "node:querystring"
import petTypeRequestJson from "../request-objects/POST-petType.json"
import petRequestJson from "../request-objects/POST_pet.json"
import vetRequestJson from "../request-objects/POST_vet.json"

import{faker} from '@faker-js/faker'

export function generateRandomPetTypeRequest(){
    const petRequest = structuredClone(petRequestJson)
    petRequest.name = faker.person.firstName()
    return petRequest
}


export function getRandomVet(){
    const vetRequest = structuredClone(vetRequestJson)
     vetRequest.firstName = faker.person.firstName()
     vetRequest.lastName = faker.person.lastName()
    
   return vetRequest
    
  
}