import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { createUserDocument } from "@/services/user-service";

import { auth } from "./firebase";
import {
  sendPasswordResetEmail,
} from "firebase/auth";


export async function forgotPassword(
  email: string
) {
  return sendPasswordResetEmail(
    auth,
    email
  );
}

export async function signup(
  email: string,
  password: string
) {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await createUserDocument(
    credential.user.uid,
    credential.user.email!
  );

  return credential;
}

export async function login(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function logout() {
  return signOut(auth);
}