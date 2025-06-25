import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function POST(request) {
    try {
        await client.connect()
        const body = await request.json()
        const newpost = client.db('News').collection('userfeed')
        await newpost.insertOne(body)
        return NextResponse.json({
            message: 'Added to the psot db',
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            errorMessage: 'Unable to add the post',
            status: 500
        })
    }

}