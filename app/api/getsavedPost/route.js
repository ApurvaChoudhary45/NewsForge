import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function GET() {
    try {
        await client.connect()
        
        const newpost = client.db('News').collection('savedfeed')
        const posts = await newpost.find({}).toArray()
        return NextResponse.json({
            message: 'Saved to the psot db',
            status: 200,
            posts
        })
    } catch (error) {
        return NextResponse.json({
            errorMessage: 'Unable to save to the post',
            status: 500
        })
    }

}