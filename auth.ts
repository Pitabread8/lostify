import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Spotify({
            authorization:
                "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-read-collaborative,playlist-modify-private,playlist-modify-public",
            clientId: process.env.AUTH_SPOTIFY_ID || "",
            clientSecret: process.env.AUTH_SPOTIFY_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.access_token = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                token,
            };
        },
    },
});
