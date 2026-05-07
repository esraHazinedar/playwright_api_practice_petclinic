import petRequestJson from "../request-objects/POST-pet.json"
import{faker} from '@faker-js/faker'

export function getNewPet(){
    const petRequest = structuredClone(petRequestJson)
    petRequest.name = faker.animal.horse()
    return petRequest
}

export function getUpdatedPet(){
    const petRequest = structuredClone(petRequestJson)
    petRequest.name = faker.animal.cow()
    return petRequest
}
