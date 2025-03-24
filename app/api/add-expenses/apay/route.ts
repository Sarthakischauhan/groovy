import { NextResponse } from "next/server";
import supabase from 'utils/supabase';
import { createExpenseSchema } from '../validations';
import { headers } from 'next/headers';

const CLIENT_SECRET = process.env.APPLE_SHORTCUT_SECRET!;

export async function POST(req: Request) {
    try {
        const headersList = headers();
        const authorization = headersList.get('authorization');

        if (!authorization || !authorization.startsWith('Bearer ') || 
            authorization.split(' ')[1] !== CLIENT_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const requestData = await req.json();
        
        const expenseData = {
            amount: Number(requestData.amount),
            necessary: requestData.necessary ?? false,
            date_posted: requestData.date_posted || new Date().toISOString(),
            type: requestData.type || 'credit',
            name: requestData.name ?? "Test", 
            user_id: "2",
            emoji: requestData.emoji
        };

        try {
            const validatedData = createExpenseSchema.parse(expenseData);
        } catch (validationError: any) {
            return NextResponse.json(
                { error: 'Validation error', details: validationError.errors },
                { status: 400 }
            );
        }

        const { data: insertedData, error } = await supabase
            .from('expenses')
            .insert([expenseData]);

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, data: insertedData },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { 
                error: 'Internal server error',
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}