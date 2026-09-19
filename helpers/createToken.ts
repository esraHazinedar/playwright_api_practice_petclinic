import { RequestHandler } from "../utils/request-handler";
import { config } from "../api-test.config";
import { APILogger } from "../utils/logger";
import { request } from "@playwright/test";


export async function createToken(email: string, password: string) {
    const context = await request.newContext()
    const logger = new APILogger()
    const api = new RequestHandler(context, config.apiUrl, logger)

    try {
        const tokenResponse = await api
            .url('https://bondaracademy.us.auth0.com')
            .path('/oauth/token')
            .body({
                "grant_type": "password",
                "username": email,
                "password": password,
                "client_id": "cWsfdquVN2OjbUfN3PVtqXcSouxPhzwf",
                "audience": "http://localhost:9966/petclinic/api/",
                "scope": "openid profile email"
            })
            .postRequest(200)
        return 'Bearer ' + tokenResponse.access_token
    } catch (error) {
        Error.captureStackTrace(error, createToken)
        throw error
    } finally {
        await context.dispose()
    }

}