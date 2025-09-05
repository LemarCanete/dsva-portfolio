'use client'

import React, { useState } from "react"
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore" 
import { auth, db } from "../../../firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const provider = new GoogleAuthProvider()

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  async function handleSignUp(event) {
    event.preventDefault()
    setError(null)

    // 1. Check required fields
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required")
      return
    }

    // 2. Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // 3. Password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // 4. Password strength validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must include at least one uppercase letter")
      return
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must include at least one lowercase letter")
      return
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must include at least one number")
      return
    }
    if (!/[@$!%*?&#]/.test(password)) {
      setError("Password must include at least one special character (@, $, !, %, *, ?, & or #)")
      return
    }

    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const userDocRef = doc(db, "users", user.uid)
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: name,
        email: user.email,
      })

      router.push("/dashboard")
    } catch (err) {
      console.error("Sign-up error:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }


  async function handleGoogleSignUp() {
    try {
      setError(null)
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userDocRef = doc(db, "users", user.uid)
      const userDocSnap = await getDoc(userDocRef)

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      }

      router.push("/dashboard")
    } catch (err) {
      console.error("Google sign-up error:", err)
      setError(err.message || "Google sign-up failed")
    }
  }

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
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>

          <div>
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        {/* Divider */}
        <Separator className="my-6" />

        {/* Social Sign up */}
        <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleSignUp}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </Button>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <a href="/Login" className="text-teal-600 font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}
