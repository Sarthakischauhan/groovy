import { NextResponse } from "next/server";
import supabase from 'utils/supabase';
import { createExpenseSchema } from '../validations';
import { headers } from 'next/headers';
import fetchUserSecret from "@/api/shortcut-keys/fetchUserSecret";
export async function POST(req: Request) {
    try {
        const headersList = headers();
        const authorization = headersList.get('authorization');

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const fetchKeyRes = await fetchUserSecret(authorization);        
        
        if (!fetchKeyRes) {
            return NextResponse.json({ error: 'Unauthorized (API key check failed)' }, { status: 401 });
        }

        const { user_id } = fetchKeyRes;
        
        const requestData = await req.json();

        const expenseData = {
            amount: Number(requestData.amount),
            necessary: requestData.necessary ?? false,
            date_posted: requestData.date_posted || new Date().toISOString(),
            type: requestData.type || 'credit',
            name: requestData.name ?? "Test", 
            emoji: requestData.emoji,
            user_id: String(user_id),
        };
        
        try {
            const validatedData = createExpenseSchema.parse(expenseData);
        } catch (validationError: any) {
            return NextResponse.json(
                { error: 'Validation error', details: validationError.errors },
                { status: 400 }
            );
        }

        const { data: insertedData, error: insertError } = await supabase
            .from('expenses')
            .insert([expenseData]);

        if (insertError) {
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: insertedData }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
