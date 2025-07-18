"use client"

import { signIn, signOut, useSession } from "next-auth/react"

function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        const { name, image } = session.user;

        return (
            <>
                <div className="flex items-center gap-3 absolute left-8 top-6">
                    {image && (
                        <img
                            src={image}
                            alt="User avatar"
                            className="w-10 h-10 rounded-full"
                        />
                    )}
                    <p className="text-md">{name}</p>
                </div>
                <button onClick={() => signOut()} className="absolute right-8 top-6 px-4 py-2 text-black bg-white rounded-lg">Sign Out</button>
            </>
        );
    }

    return <button onClick={() => signIn("spotify", { callbackUrl: "/" })} className="absolute right-8 top-6 px-4 py-2 text-black bg-white rounded-lg">Sign In</button>;
}

export default function SignIn() {
    return (
        <AuthButton />
    );
}