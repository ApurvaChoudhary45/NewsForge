import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from 'mongodb'
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function DELETE(request) {
    try {
        await client.connect()
        const body = await request.json()
        const {id} =body
        console.log(id)
        const newpost = client.db('News').collection('savedfeed')
        await newpost.deleteOne({id: id})
        return NextResponse.json({
            message: 'Removed from the post db',
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            errorMessage: 'Unable to remove the saved post',
            status: 500
        })
    }

}