async function main() {
  const { applicationDefault, initializeApp } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");

  initializeApp({
    credential: applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });

  const email = process.argv[2];

  if (!email) {
    throw new Error(
      'Provide the account email: node scripts/set-admin.cjs "you@example.com"'
    );
  }

  const user = await getAuth().getUserByEmail(email);

  const existingClaims = user.customClaims || {};

  await getAuth().setCustomUserClaims(user.uid, {
    ...existingClaims,
    admin: true,
  });

  console.log(`Admin permission assigned to ${user.email}`);
}

main().catch((error) => {
  console.error("Could not assign admin permission:", error.message);
  process.exitCode = 1;
});
