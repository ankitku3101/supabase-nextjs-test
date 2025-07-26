'use client'

import { useState } from "react"
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function ConfessionForm () {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch('/api/confess', {
            method: 'POST',
            body: JSON.stringify({message}),
        })
        setMessage('')
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/2 h-1/2 space-y-4 flex flex-col items-center">
            <Textarea
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value)
                }}
                placeholder="Tell me a secret"
                className="w-full h-40 p-2 border rounded text-white"
                required
            />
            <Button
                type="submit"
                className="px-4 py-2 rounded"
            >
                Confess It !
            </Button>
        </form>
    )
}