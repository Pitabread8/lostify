"use client"

import { signIn, signOut, SessionProvider, useSession } from "next-auth/react"

function isSignedIn() {
    const { data: session } = useSession();

    if (session) {
        return true;
    }

    return false;
}

export default function SignIn() {
    return (
        <SessionProvider>
            {isSignedIn ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => signIn("spotify")}>Sign in</button>}
        </SessionProvider>
    )
}
