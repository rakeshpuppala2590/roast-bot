'use client'

import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Prompt from "./_components/prompt";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import GoogleSignIn from "@/components/GoogleSignIn";

export default function Home() {
    const [user] = useAuthState(auth);
    const [isLogin, setIsLogin] = useState(true);

    if (user) {
        return (
            <div className="flex flex-col h-screen bg-lavender text-black">
                <Prompt />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-lavender text-black">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </h1>
                {isLogin ? <Login /> : <Signup />}
                <div className="mt-4">
                    <p className="text-center mb-2">Or</p>
                    <GoogleSignIn />
                </div>
                <p className="mt-4 text-center">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
}


