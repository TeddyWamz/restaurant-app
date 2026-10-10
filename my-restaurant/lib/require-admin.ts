
import "server-only";

import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function requireAdmin(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);

    if (decodedToken.admin !== true) {
      return {
        error: NextResponse.json(
          { message: "You do not have permission to perform this action." },
          { status: 403 }
        ),
      };
    }

    return {
      uid: decodedToken.uid,
    };
  } catch {
    return {
      error: NextResponse.json(
        { message: "Your session is invalid or expired. Please sign in again." },
        { status: 401 }
      ),
    };
  }
}