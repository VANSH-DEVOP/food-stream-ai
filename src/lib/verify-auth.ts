import { NextRequest }
from "next/server";

import {
  getAdminAuth,
} from "./firebase-admin";

export async function verifyAuth(
  request: NextRequest
) {

  const authHeader =
    request.headers.get(
      "authorization"
    );

  if (
    !authHeader ||
    !authHeader.startsWith(
      "Bearer "
    )
  ) {
    return null;
  }

  const token =
    authHeader
      .slice("Bearer ".length)
      .trim();

  if (!token) {
    return null;
  }

  try {

    // checkRevoked rejects tokens whose session was signed out or whose
    // account was disabled before the hour-long ID token would have
    // expired on its own.
    return await getAdminAuth()
      .verifyIdToken(
        token,
        true
      );

  } catch {

    return null;

  }
}
