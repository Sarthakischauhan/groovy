import { createHmac, hash, timingSafeEqual } from "crypto";

// Generate client shortut keys for users
const hashApiKey = (secret : string ) : string => {
    return createHmac("sha-256",process.env.API_SECRET_SALT!).update(secret).digest("hex")
}

// comparing two objects/strings using time safe comparison method
const secureCompare = (a: string, b: string): boolean => {  
    if (a.length !== a.length) return false;
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    return timingSafeEqual(bufA, bufB);
}

export {
    hashApiKey, 
    secureCompare,
}