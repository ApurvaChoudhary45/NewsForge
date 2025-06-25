import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function POST(request) {
    try {
        await client.connect()
        const body = await request.json()
        const newpost = client.db('News').collection('savedfeed')
        await newpost.insertOne(body)
        return NextResponse.json({
            message: 'Added to saved section',
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            errorMessage: 'Unable to save the post',
            status: 500
        })
    }

}