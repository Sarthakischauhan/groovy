import { emojiMap } from 'lib/emojiTransactionMapping'
import { NextResponse } from 'next/server'

type enrichResponse = {
    emoji : string, 
    name : string, 
}

type enrichRequest = {
    name : string
}


export async function POST(req:Request){
    const data = await req.json()
    
    // split words by "-" or empty spaces
    const words = data?.name.split(/[\s-]+/)
    const possibleEmojis = []
    
    // get possible emojis for each word. 
    for (let word of words){
        possibleEmojis.push(emojiMap[word.toLowerCase()] ?? null)
    }
    
    // If no mapping found return default emoji
    if (possibleEmojis.every((emoji) => !emoji)){
        return new NextResponse(
            JSON.stringify({
                emoji: emojiMap["default"], 
                name: data.name 
            }),
            {status : 200,}
        )
    }

    // If potential mappings, return the first possible emoji mapping
    const finalEmoji = possibleEmojis.find((e) => e != null)
    return new NextResponse(
        JSON.stringify({
            emoji: finalEmoji, 
            name: data.name 
        }),
        {status : 200}
    )
}

export async function GET(request: Request) {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { status: 405, headers: { 'Allow': 'POST' } }
    );
}