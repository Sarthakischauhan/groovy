import { NextResponse } from 'next/server'
import supabase from 'utils/supabase'


export async function POST(req:Request){
    const requestData = await req.json()
    const { amount, necessary, date_posted, type, user_id, name, emoji } = requestData

    const { data: insertedData, error } = await supabase
    .from('expenses')
    .insert([
      {
        amount: amount, // Convert to number
        necessary: necessary,
        date_posted: date_posted,
        type: "credit",
        name: name,
        user_id: user_id, 
        emoji: emoji 
      }
    ])
    if (error){
        return new Response(
            JSON.stringify({ error: error.message }), 
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify({ success: true, data: insertedData }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}