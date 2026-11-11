
// "use client";

// import { FormEvent, useState } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";

// export default function AdminLoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function checkAdminAccess(user: {
//     getIdTokenResult: (forceRefresh?: boolean) => Promise<{
//       claims: Record<string, unknown>;
//     }>;
//   }) {
//     // Refresh the token so newly assigned claims are included.
//     const tokenResult = await user.getIdTokenResult(true);

//     if (tokenResult.claims.admin !== true) {
//       await signOut(auth);
//       throw new Error(
//         "This account does not have restaurant admin permission."
//       );
//     }

//     router.replace("/admin");
//   }

//   async function handleEmailLogin(
//     event: FormEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const result = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       await checkAdminAccess(result.user);
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "Unable to sign in. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleGoogleLogin() {
//     setError("");
//     setLoading(true);

//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);

//       await checkAdminAccess(result.user);
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "Google sign-in failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Restaurant Admin
//         </h1>

//         <p className="mt-2 text-gray-600">
//           Sign in to manage restaurant orders.
//         </p>

//         <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-1 block text-sm font-medium text-gray-500"
//             >
//               Email address
//             </label>

//             <input
//               id="email"
//               type="email"
//               autoComplete="username"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               required
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-600 text-gray-500"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="mb-1 block text-sm font-medium text-gray-500"
//             >
//               Password
//             </label>

//             <input
//               id="password"
//               type="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               required
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-600 text-gray-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
//           >
//             {loading ? "Signing in..." : "Sign in with Email"}
//           </button>
//         </form>

//         <div className="my-5 flex items-center gap-3">
//           <div className="h-px flex-1 bg-gray-200" />
//           <span className="text-sm text-gray-500">OR</span>
//           <div className="h-px flex-1 bg-gray-200" />
//         </div>

//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="w-full rounded-3xl border border-gray-300 px-4 py-2 font-semibold text-white bg-blue-300 hover:bg-blue-500 disabled:opacity-60"
//         >
//           {loading ? "Please wait..." : "Continue with Google"}
//         </button>

//         {error && (
//           <p
//             role="alert"
//             className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
//           >
//             {error}
//           </p>
//         )}
//       </div>
//     </main>
//   );
// }






"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type Method = "email" | "google" | null;

function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code;
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-email":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return ""; // user cancelled, no error needed
    default:
      return err instanceof Error && err.message.startsWith("This account")
        ? err.message
        : "Unable to sign in. Please try again.";
  }
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [method, setMethod] = useState<Method>(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [checking, setChecking] = useState(true);

  const loading = method !== null;

  async function verifyAdmin(user: User) {
    const token = await user.getIdTokenResult(true);
    if (token.claims.admin !== true) {
      await signOut(auth);
      throw new Error("This account does not have restaurant admin permission.");
    }
    router.replace("/admin");
  }

  // Skip the form if an admin is already signed in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdTokenResult();
          if (token.claims.admin === true) {
            router.replace("/admin");
            return;
          }
        } catch {
          /* fall through to the form */
        }
      }
      setChecking(false);
    });
    return unsubscribe;
  }, [router]);

  async function run(m: Exclude<Method, null>, action: () => Promise<User>) {
    setError("");
    setInfo("");
    setMethod(m);
    try {
      await verifyAdmin(await action());
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setMethod(null);
    }
  }

  function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run("email", async () => (await signInWithEmailAndPassword(auth, email, password)).user);
  }

  function handleGoogleLogin() {
    run("google", async () => (await signInWithPopup(auth, new GoogleAuthProvider())).user);
  }

  async function handleReset() {
    setError("");
    setInfo("");
    if (!email) {
      setError("Enter your email above first, then click “Forgot password?”.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
    } catch {
      /* intentionally ignored so we don't reveal which emails exist */
    }
    setInfo("If an account exists for that email, a reset link is on its way.");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading…</p>
      </main>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-500/30";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Restaurant Admin</h1>
        <p className="mt-2 text-gray-600">Sign in to manage restaurant orders.</p>

        <form onSubmit={handleEmailLogin} className="mt-6 space-y-4" aria-busy={loading}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-orange-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${inputClass} pr-16`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-3 text-sm text-gray-500 hover:text-gray-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 px-4 py-1 font-semibold text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 disabled:opacity-60"
          >
            {method === "email" ? "Signing in…" : "Sign in with Email"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-1 font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-60"
        >
          {method === "google" ? "Please wait…" : "Continue with Google"}
        </button>

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {info && (
          <p role="status" className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {info}
          </p>
        )}
      </div>
    </main>
  );
}