import { NextResponse } from "next/server";
import supabase from "utils/supabase";
import { headers } from "next/headers";
import fetchUserSecret from "../fetchUserSecret";

let KEY_PREFIX_LENGTH = Number(process.env?.KEY_PREFIX_LENGTH);

export async function GET(req : Request){

    // Check if being called internally or no 
    const headersList = headers();
    const authorization = headersList.get('authorization');

    if (!authorization || !authorization.startsWith("Bearer ")){
        return NextResponse.json({error:"Unauthorised: Can only be called internally"}, {status: 403})
    }
    // Use the security key in the headers to create a key_prefix
    try{
        const matchedKey = await fetchUserSecret(authorization);

        // update the last accessed column of the table
        await supabase
        .from("apay_shortcuts_keys")
        .update({ last_used: new Date().toISOString() })
        .eq("id", matchedKey.id);

        return NextResponse.json({
            user_id: matchedKey.user_id, 
            key_prefix: matchedKey.key_prefix,
        });

    }
    catch (e:any){
        return NextResponse.json({error:e.message})
    }
}