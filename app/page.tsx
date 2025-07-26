"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WallPage() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchConfessions = async () => {
      const { data, error } = await supabase
        .from("guestbook")
        .select("message");

      if (error) {
        console.error("Error fetching confessions:", error);
        return;
      }

      const validMessages = (data ?? [])
        .map((item) => item.message)
        .filter((msg): msg is string => !!msg);

      setMessages(validMessages);
    };

    fetchConfessions();
  }, []);

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <h1 className="text-7xl font-bold tracking-tight text-center p-8"><span className="text-red-300">Confess</span>ions W<span className="text-blue-300">all</span></h1>
      
      <div className="flex justify-center mb-10">
        <Link href="/submit">
          <Button className="px-4 py-2 rounded hover:bg-[#454545] cursor-pointer">
            Wanna Confess Something?
          </Button>
        </Link>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((msg, idx) => (
          <Card key={idx} className=" text-white shadow-md rounded-xl bg-[#0a0a0a] border border-gray-500">
            <CardContent className="p-auto text-base text-center">
              {msg}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
