import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import supabase from 'utils/supabase';
import { hashApiKey }  from "../hashingService";

interface SecretObject {
    user_id : number;
    key_hash: string; 
    key_prefix: string;
    last_used: string;
    active: boolean;
}

let KEY_PREFIX_LENGTH = Number(process.env?.KEY_PREFIX_LENGTH);


export async function POST(req: Request){   
    // create a random uuid based secret keys
    const requestData = await req.json()
    const user_id = requestData?.user_id;

    if (!user_id){
        return  NextResponse.json({error:"Missing user id while creating an api key"},{status:400});
    }

    const rawKey = `grvyapay-${randomBytes(32).toString("hex")}`; // e.g., grvyapay-2bd123...
    const keyPrefix = rawKey.slice(0, KEY_PREFIX_LENGTH!);
    const hashedKey = hashApiKey(rawKey);

    // Data object 
    const apiSecretObject : SecretObject = {
        user_id: user_id,
        key_hash: hashedKey, 
        key_prefix: keyPrefix, 
        active: true, 
        last_used: new Date().toISOString(), 
    }

    // Send them to supabase 
    const { error } = await supabase.from("apay_shortcuts_keys")
    .insert(apiSecretObject);

    if (error){
        console.error("Failed to store API key:", error);
        return NextResponse.json({ error: "Failed to store API key" }, { status: 500 });
    }

    // return the generated api key back to the user
    return NextResponse.json({
        api_key: rawKey,
        key_prefix: keyPrefix,
        message: "Save this key securely. It will not be shown again.",
    });
}
