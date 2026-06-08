import { NextRequest }
from "next/server";

import {
  adminAuth,
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
    authHeader.replace(
      "Bearer ",
      ""
    );

  try {

    return await adminAuth
      .verifyIdToken(token);

  } catch {

    return null;

  }
}