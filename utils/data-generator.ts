import { stringify } from "node:querystring"
import petTypeRequestJson from "../request-objects/POST-petType.json"
import petRequestJson from "../request-objects/POST_pet.json"

import{faker} from '@faker-js/faker'

export function generateRandomPetTypeRequest(){
    const petRequest = structuredClone(petRequestJson)
    petRequest.name = faker.person.firstName()
    return petRequest
}
