const app = require('../app')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const supertest = require('supertest')
require('core-js');



let mongoserver
beforeAll(async () => {
    mongoserver =await MongoMemoryServer.create()
    await mongoose.connect(mongoserver.getUri())
})


afterAll(async()=>{
    mongoose.disconnect()
    mongoserver.stop()
})


describe('check user signup',()=>{
    const userData = {
        name:'testuser',
        email:'testuser@gmail.com',
        password:'testuser123'
    }
    test('Addin a new valid user',async()=>{
        const response = await supertest(app).post('/signup').send(userData)
        expect(response.body.userData).toHaveProperty('_id')
        expect(response.body.userData).toHaveProperty('name')
        expect(response.body.userData).toHaveProperty('email')
        expect(response.body.userData).toHaveProperty('password')
        expect(response.body.status).toBe(true)
        expect(response.status).toBe(200)
    })

    test('checking the existing user',async()=>{
        const response = await supertest(app).post('/signup').send(userData)
        expect(response.body.status).toBe(false)
        expect(response.body.error).toBe('User is already exist')
        expect(response.status).toBe(409)
    })

    test('checking without email and password',async()=>{
        const response = await supertest(app).post('/signup').send({name:'sinan'})
        expect(response.status).toBe(500)
    })
})


describe('checking user login',()=>{
    const userData = {
        email:'testuser@gmail.com',
        password:'testuser123'
    }
    test('checking a valid user in login',async()=>{
        const response = await supertest(app).post('/login').send(userData)
        expect(response.body.status).toBe(true)
        expect(response.body.userData).toHaveProperty('_id')
        expect(response.body.userData).toHaveProperty('name')
        expect(response.body.userData).toHaveProperty('email')
        expect(response.body.userData).toHaveProperty('password')
    })
    test('checking incorres password types user',async()=>{
        const response = await supertest(app).post('/login').send({email:'testuser@gmail.com',password:'sdkjijfid'})
        expect(response.body.status).toBe(false)
        expect(response.body.error).toBe("Incorrect password")
    })
    test('checking non existing user',async()=>{
        const response = await supertest(app).post('/login').send({email:'somthing@gmail.com',password:'sdkjijfid'})
        expect(response.body.status).toBe(false)
        expect(response.body.error).toBe("Eamil not found")
    })
})