import {
  App,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import {
  getAuth,
} from "firebase-admin/auth";

import {
  getFirestore,
} from "firebase-admin/firestore";

function requireEnv(
  name: string
) {
  const value =
    process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

let app: App | undefined;

// Initialised lazily so that importing a route module (during `next build`,
// for example) never requires service-account credentials to be present.
function getAdminApp() {

  if (app) {
    return app;
  }

  app =
    getApps().length
      ? getApps()[0]
      : initializeApp({
          credential: cert({
            projectId:
              requireEnv(
                "FIREBASE_PROJECT_ID"
              ),

            clientEmail:
              requireEnv(
                "FIREBASE_CLIENT_EMAIL"
              ),

            privateKey:
              requireEnv(
                "FIREBASE_PRIVATE_KEY"
              ).replace(
                /\\n/g,
                "\n"
              ),
          }),
        });

  return app;
}

export function getAdminAuth() {
  return getAuth(
    getAdminApp()
  );
}

export function getAdminDb() {
  return getFirestore(
    getAdminApp()
  );
}
