'use client';
import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useRouter } from "next/navigation";

const provider = new GoogleAuthProvider();

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in:", user);
                
                router.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.error("Sign-in error:", errorCode, errorMessage);
                alert(`Sign-in failed: ${errorMessage}`);
                setLoading(false);
            });
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });
                console.log("New user document created on sign-in.");
            } else {
                console.log("User document already exists.");
            }
                router.push('/');
            })
        .catch((error) => {
            alert("Google sign-in error:", error);
        });
    };

    const handleResetPassword = () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        alert("Sending password reset email...");

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("A password reset email has been sent to your inbox. Please check your email.");
                setEmail("");
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;

                if (errorCode === 'auth/user-not-found') {
                    errorMessage = 'The email address you entered is not registered.';
                } else if (errorCode === 'auth/invalid-email') {
                    errorMessage = 'The email address is not valid.';
                }

                alert(`Error: ${errorMessage}`);
            });
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 px-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
            {/* Logo + Title */}
            <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto rounded-md bg-gradient-to-br from-blue-700 to-teal-400 flex items-center justify-center text-white font-bold">W</div>
            <h1 className="mt-4 text-2xl font-bold text-gray-800">Sign in to Workflow Studio</h1>
            <p className="text-gray-500 text-sm mt-1">Access your workflows and automation dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-black/50"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-black/50"
                />
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-black/50">Remember me</span>
                </label>
                <a className="text-teal-600 hover:underline cursor-pointer" onClick={handleResetPassword}>Forgot password?</a>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow disabled:opacity-60">
                {loading ? "Signing in..." : "Sign In"}
            </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3 text-sm text-gray-400">
            <div className="flex-1 border-t"></div>
            <span>or</span>
            <div className="flex-1 border-t"></div>
            </div>

            {/* Social login buttons */}
            <div className="space-y-3">
            <button className="w-full py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer" onClick={handleGoogleSignIn}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span className="text-black/50">Continue with Google</span>
            </button>
            {/* <button className="w-full py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="GitHub" className="w-5 h-5" />
                <span className="text-black/50">Continue with Facebook</span>
            </button> */}
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-500">
            Don’t have an account? <a href="/Signup" className="text-teal-600 font-medium hover:underline">Sign up</a>
            </p>
        </div>
        </div>
    );
}
