'use client';
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Use ES module imports
import { auth, db } from "../../../firebase"; // Confirm this path is correct
import { useRouter } from "next/navigation";

const provider = new GoogleAuthProvider();

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSignUp(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const userDocRef = doc(db, 'users', user.uid);
        
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: name,
          email: user.email,
        });
        console.log("New user data saved to Firestore.");

        router.push('/');
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign-up error:", errorCode, errorMessage);
        alert(`Error: ${errorMessage}`);
      });
  }

  const handleGoogleSignUp = () => {
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
          console.log('New user data saved to Firestore.');
        } else {
          console.log('User already exists in Firestore.');
        }
        
        router.push('/');
      })
      .catch((error) => {
        console.error('Google sign-up error:', error);
      });
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-md bg-gradient-to-br from-blue-700 to-teal-400 flex items-center justify-center text-white font-bold">W</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join Workflow Studio and start automating today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-black/50"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-black/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow disabled:opacity-60">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3 text-sm text-gray-400">
          <div className="flex-1 border-t"></div>
          <span>or</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Social sign up buttons */}
        <div className="space-y-3">
          <button
            className="w-full py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer"
            onClick={handleGoogleSignUp} // Attach onClick to the button
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-black/50">Sign up with Google</span>
          </button>
          {/* <button className="w-full py-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="GitHub" className="w-5 h-5" />
            <span className="text-black/50">Sign up with Facebook</span>
          </button> */}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <a href="/Login" className="text-teal-600 font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}