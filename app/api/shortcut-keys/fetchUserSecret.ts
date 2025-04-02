import {hashApiKey, secureCompare} from "./hashingService";
import supabase from "utils/supabase";

let KEY_PREFIX_LENGTH = Number(process.env?.KEY_PREFIX_LENGTH);

const fetchUserSecret = async (authorization:string) => {
    const rawKey = authorization.replace("Bearer ", "").trim();
    const keyPrefix = rawKey.slice(0, KEY_PREFIX_LENGTH!);
    const hashedKey =  hashApiKey(rawKey);
    // fetch api key data based 
    const { data: keyData , error } = await supabase
    .from("apay_shortcuts_keys")
    .select("id, key_hash, key_prefix, active, user_id")
    .eq("key_prefix", keyPrefix)
    .eq("active", true);

    if (error) {
        throw Error("Unable to fetch data.")
    }

    if (!keyData || keyData.length === 0) {
        throw Error("Could not find API key")
    }

    type retrievedKey = {
        key_prefix : string;
        id : string; 
        key_hash: string; 
        active: boolean;
        user_id: number; 
    }

    const matchedKey : retrievedKey | undefined = keyData.find((entry : any) =>
        secureCompare(entry.key_hash, hashedKey)
    );

    if (!matchedKey || matchedKey == undefined) {
        throw Error("Invalid API key --  Coulnd't not match") 
    }

    if (!matchedKey.active){
        throw Error("Provided key not active or valid")
    }

    return {
        user_id: matchedKey.user_id, 
        key_prefix: matchedKey.key_prefix,
        id: matchedKey.id
    }

}

export default fetchUserSecret;