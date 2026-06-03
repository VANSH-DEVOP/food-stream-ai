import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import { foodItems }
  from "../backup/food-data.backup";

// Same config as lib/firebase.ts

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app =
  initializeApp(
    firebaseConfig
  );

const db =
  getFirestore(app);

async function seedFoods() {
  try {

    console.log(
      "Seeding foods..."
    );

console.log("SUCCESS");

    for (const food of foodItems) {
  try {
    console.log(
      "Adding:",
      food.name
    );

    await addDoc(
      collection(db, "foods"),
      {
        ...food,
        createdAt:
          Timestamp.now(),
        isAvailable:
          true,
      }
    );

    console.log(
      "Success:",
      food.name
    );

  } catch (error) {
    console.error(
      "Failed food:",
      food
    );

    console.error(error);

    break;
  }
}

    console.log(
      "Foods seeded successfully!"
    );

    process.exit(0);

  } catch (error) {

    console.error(
      error
    );

    process.exit(1);
  }
}

seedFoods();