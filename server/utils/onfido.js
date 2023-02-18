// Libs
import dotenv from 'dotenv'
import { Onfido, Region } from '@onfido/api'

// Config
const onfido = new Onfido({
    apiToken: process.env.ONFIDO_API_KEY,
    region: Region.EU,
})

export async function createApplicant(data) {
    const newApplicant = await onfido.applicant.create({
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        address: {
            postcode: data.address.postcode,
            country: data.address.country,
        },
        location: {
            country_of_residence: 'FRA',
        },
    })
    return newApplicant
}

export async function getApplicant(id) {
    const applicant = await onfido.applicant.find(id)
    return applicant
}

export async function createSdkToken(id) {
    const sdkToken = await onfido.sdkToken.generate({
        applicantId: id,
        referrer: 'http://88.169.186.137:3000/',
    })
    return sdkToken
}

export async function createCheck(id) {
    const check = await onfido.check.create({
        applicantId: id,
        reportNames: ['document', 'facial_similarity_photo'],
    })
    return check
}
