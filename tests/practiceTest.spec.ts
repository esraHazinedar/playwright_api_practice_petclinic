import { test } from '../utils/fixtures';
import { expect } from '../utils/custom-exptect';

test('Sample PetClinic Test', async ({ api }) => {
    const ownersResponse = await api
        .path('/owners')
        .getRequest(200)
    expect(ownersResponse[0].firstName).toEqual('George')
    expect(ownersResponse[0].lastName).toEqual('Franklin')
})