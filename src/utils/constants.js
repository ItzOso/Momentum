export const signinErrorMessages = {
  "auth/invalid-email":
    "The email address you entered is not valid. Please check the format (e.g., user@example.com).",
  "auth/user-disabled":
    "This account has been disabled. Please contact support for assistance.",
  // Often grouped into 'auth/invalid-credential' in newer SDKs
  "auth/user-not-found":
    "No account found with this email address. Please check your email or sign up.",
  // Often grouped into 'auth/invalid-credential' in newer SDKs
  "auth/wrong-password": "Incorrect password. Please try again.",
  // More common in Firebase v9+ to prevent email enumeration
  "auth/invalid-credential":
    "Invalid email or password. Please check your credentials and try again.",
  "auth/too-many-requests":
    "Access to this account has been temporarily disabled due to too many failed login attempts. You can try again later, or reset your password.",
  "auth/network-request-failed":
    "A network error occurred. Please check your internet connection and try again.",
  "auth/operation-not-allowed":
    "Signing in with email and password is not currently enabled. Please contact support if this issue persists.",
  // Generic fallback message
  "auth/unknown":
    "An unexpected error occurred while trying to sign in. Please try again later or contact support.",
};

export const signupErrorMessages = {
  "auth/email-already-in-use":
    "This email address is already in use by another account. Please try a different email or log in.",
  "auth/invalid-email":
    "The email address you entered is not valid. Please check the format (e.g., user@example.com).",
  "auth/operation-not-allowed":
    "Sorry, creating accounts with email and password is not enabled right now. Please contact support if this issue persists.",
  "auth/weak-password":
    "The password is too weak. Please choose a stronger password (e.g., at least 6 characters, a mix of letters and numbers).",
  "auth/too-many-requests":
    "We've detected too many attempts from this device. For security, access has been temporarily blocked. Please try again later.",
  "auth/network-request-failed":
    "A network error occurred. Please check your internet connection and try again.",
  // Generic fallback message for other unexpected errors
  "auth/unknown":
    "An unexpected error occurred during signup. Please try again later or contact support.",
};

export const googleSignInPopupErrorMessages = {
  "auth/popup-closed-by-user":
    "You closed the Google Sign-In window before completing the process. Please try again if you'd like to sign in with Google.",
  "auth/popup-blocked":
    "Your browser blocked the Google Sign-In popup. Please check your browser settings to allow popups for this site and try again.",
  "auth/cancelled-popup-request":
    "The sign-in attempt was cancelled because another sign-in window was opened. Please try signing in again.",
  "auth/operation-not-allowed":
    "Signing in with Google is not currently enabled for this application. Please contact support if this issue persists.",
  "auth/unauthorized-domain":
    "This website domain is not authorized for Google Sign-In with this application. Please contact support.",
  "auth/account-exists-with-different-credential":
    "An account already exists with this email address, but it was created with a different sign-in method (like email/password). Please sign in using the method you originally used, or contact support if you need to link your Google account.",
  "auth/network-request-failed":
    "A network error occurred. Please check your internet connection and try signing in again.",
  "auth/internal-error":
    "An unexpected error occurred on the server while trying to sign you in with Google. Please try again in a few moments.",
  "auth/user-disabled":
    "This user account has been disabled. Please contact support for assistance.",
  "auth/invalid-credential":
    "The Google authentication credential was invalid or has expired. Please try signing in with Google again.",
  "auth/oauth-credential-already-in-use":
    "This Google account is already linked to a different user profile in our system. If you have another account with us, please sign out and sign in with that account to link Google, or contact support.",
  // Generic fallback message
  "auth/unknown":
    "An unexpected error occurred while trying to sign in with Google. Please try again later or contact support.",
};
