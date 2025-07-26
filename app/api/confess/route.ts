import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
     try {
        const { message } = await req.json();

        const { error } = await supabase.from("guestbook").insert([{ message }]);

        if (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        }

        return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
        });
    }
}