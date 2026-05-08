import petRequestJson from "../request-objects/POST-pet.json"
import{faker} from '@faker-js/faker'

export function generateRandomPetTypeRequest(){
    const petRequest = structuredClone(petRequestJson)
    petRequest.name = faker.animal.horse()
    return petRequest
}
