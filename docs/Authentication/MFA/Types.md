---
hide:
    - footer
---

#Types of Authentication Factors

This section covers the different types of authentication factors that are available and their security considerations. Each type is divided into the following categories:

| Factor Definition  | Types                                                 | Example                                                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Something you know | A value that a user remembers                         | [Memorized Secret](#memorized-secrets)                                                                                                                                                                                                                                                   |
| Something you have | The possession of a unique value                      | [Look-up Secrets](#look-up-secrets), [Out-of-Band Devices](#out-of-band-devices), [Single and Multi Factor OTP Devices](#single-and-multi-factor-otp-devices) and [Single and Multi-factor Cryptographic Software or Device](#single-and-multi-factor-cryptographic-device-and-software) |
| Something you are  | A physical attribute of a user that is unique to them | [Biometric](#biometric)                                                                                                                                                                                                                                                                  |

## <ins>Something you know</ins>

### 🧠 Memorized Secrets

🔶 **Definition:** A secret value intended to be chosen and memorized by the user

🔶 **Example:**

-   Passwords
-   Security Questions

📝 **Password Security Checklist:**
!!! Note

    Password security checklist can be found [here](../UserID-Passwords.md)

📝 **Security Questions Security Checklist:**

!!! Danger

    Security questions should NOT be used as it is considered RESTRICTED in NIST <a href="https://pages.nist.gov/800-63-3/sp800-63b.html#-5112-memorized-secret-verifiers" target="_blank">SP 800-63B 5.1.1.2</a>

| #️⃣  | ✅Items                                                                                                                                                                                                                                                          |                                        ⚠️Severity                                         |                        🗡️Attacks                        |     🔗Sources      |
| :-: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------: | :-----------------------------------------------------: | :----------------: |
|  1  | <em>Verify:</em> Security questions are not used as an authentication factor </br> <em>Reason:</em> Weak form of authentication as value can be easily guessed                                                                                                   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Bruteforcing` <span style="opacity:0">`xxxxxxx`</span> | [OWASP CS](#cs-sq) |
|  2  | <em>Verify:</em> Simple answers such as '123' are restricted </br> <em>Reason:</em> Easily guessable value                                                                                                                                                       | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Bruteforcing`                      | [OWASP CS](#cs-sq) |
|  3  | <em>Verify:</em> User is required to reauthenticate when updating security questions </br> <em>Reason:</em> Ensure that request is coming from the intended user                                                                                                 | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Impersonation`                     | [OWASP CS](#cs-sq) |
|  4  | <em>Verify:</em> More than one question is asked to increase complexity </br> <em>Reason:</em> Makes guessing harder                                                                                                                                             | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Bruteforcing`                      | [OWASP CS](#cs-sq) |
|  5  | <em>Verify:</em> Questions that are being asked are specific to each user instead of generic questions </br> <em>Reason:</em> Generic questions have generic answers and are easily guessable                                                                    | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Bruteforcing`                      | [OWASP CS](#cs-sq) |
|  6  | <em>Verify:</em> Security questions are presented after when the username and password are accepted </br> <em>Reason:</em> Security questions should only be used as a sector factor because its not as strong as passwords                                      | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Bruteforcing`                      | [OWASP CS](#cs-sq) |
|  7  | <em>Verify:</em> Security questions are hashed when stored in the database and must follow the [Password Storage](../UserID-Passwords.md#password-storage) guidelines</br> <em>Reason:</em> Incase answers leak, the hash value won't allow access to an account | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                 `Impersonation` `Theft`                 | [OWASP CS](#cs-sq) |

## <ins>Something you have</ins>

### 📖 Look-up Secrets

🔶 **Definition:** Look-up secrets are a set of secrets shared between the user and a website.

🔶 **Example:** Acts as a recovery/backup codes when the user forgets their password or locks their account.

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                                                                  |                                        ⚠️Severity                                         |                        🗡️Attacks                        |   🔗Sources   |
| :-: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------: | :-----------------------------------------------------: | :-----------: |
|  1  | <em>Verify:</em> Look-up secret has at least 112 bit of entropy </br> <em>Reason:</em> Minimum randomness that makes guessing challenging                                                                                                                                | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Bruteforcing` <span style="opacity:0">`xxxxxxx`</span> | [NIST](#nist) |
|  2  | <em>Verify:</em> Verifier retains only a hashed version of the look-up secrets which follow the [Password Storage](../UserID-Passwords.md#password-storage) guidelines</br> <em>Reason:</em> Incase lookup secret leaks, the hash value won't allow access to an account | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |         `Bruteforcing` `Impersonation` `Theft`          | [NIST](#nist) |
|  3  | <em>Verify:</em> If entropy is less than 112 bit, the lookup secret is hashed with a salt that's of a 32 bit length </br> <em>Reason:</em> Compensate lower entropy with a salt which will increase entropy                                                              | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Bruteforcing`                      | [NIST](#nist) |
|  4  | <em>Verify:</em> If the the look-up secret's entropy is less than 64 bits, rate limiting mechanisms shall be put in place </br> <em>Reason:</em> Additional prevention against guessing to compensate for lower entropy                                                  | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Bruteforcing`                      | [NIST](#nist) |
|  5  | <em>Verify:</em> Look-up secret is accepted only once </br> <em>Reason:</em> Prevent a value to be used more than once incase it leaks                                                                                                                                   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Replay Attack`                     | [NIST](#nist) |
|  6  | <em>Verify:</em> User is required to reauthenticate with two factors when requesting new look-up secrets </br> <em>Reason:</em> Ensure that the actual user is making a change not someone else                                                                          | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                 `Impersonation` `Theft`                 | [NIST](#nist) |
|  7  | <em>Verify:</em> Once new look-up secrets are generated, older once are no longer relevant </br> <em>Reason:</em> Prevent reuse incase of theft                                                                                                                          | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                         `Theft`                         | [NIST](#nist) |

### 📱 Out-of-Band Devices

🔶 **Definition:** Secure out of band authenticators are physical devices that can communicate with the verifier over a secure
secondary channel.

🔶 **Example:**

-   Push notifications to mobile devices for authentication
-   SMS or phone call to deliver an authentication code

!!! danger

    OTP delivered through SMS or phone is not secure and is considered RESTRICTED in NIST <a href="https://pages.nist.gov/800-63-3/sp800-63b.html#-5133-authentication-using-the-public-switched-telephone-network" target="_blank">5.1.3.3</a>

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                                                                               |                                        ⚠️Severity                                         |                            🗡️Attacks                             |   🔗Sources   |
| :-: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------: | :--------------------------------------------------------------: | :-----------: |
|  1  | <em>Verify:</em> Phone and SMS should are not being used as a out of band verifier </br> <em>Reason:</em> Considered as a restricted category by NIST                                                                                                                                 | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Theft` `Impersonation` <span style="opacity:0">`xxxxxxx`</span> | [NIST](#nist) |
|  2  | <em>Verify:</em> Out of band verifier expires requests, codes, or tokens after 10 minutes </br> <em>Reason:</em> If the verifier doesn't receive the code in under 10 minutes it indicates something is wrong. Maybe the user did not receive the code or it was sent to someone else | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                             `Theft`                              | [NIST](#nist) |
|  3  | <em>Verify:</em> Authentication secrets, codes, or tokens are only usable once, and only for the original authentication request </br> <em>Reason:</em> Prevent reuse incase of theft                                                                                                 | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Theft` `Impersonation`                      | [NIST](#nist) |
|  4  | <em>Verify:</em> Verifier retains only a hashed version of the authentication code which follow the [Password Storage](../UserID-Passwords.md#password-storage) guidelines</br> <em>Reason:</em> Incase code leaks, the hash value won't allow access to an account                   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                     `Theft` `Impersonation`                      | [NIST](#nist) |
|  5  | <em>Verify:</em> Authentication code is generated by a secure random number generator, containing at least 20 bits of entropy (typically a six digital random number is sufficient) </br> <em>Reason:</em> Make is challenging to predict the value                                   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                          `Bruteforcing`                          | [NIST](#nist) |

|

### 🔢 Single and Multi Factor OTP Devices

🔶 **Definition:**

-   Single factor One time Password (OTP) devices are physical devices that generate OTPs
-   Multi factor OTP devices are similar to single factor OTP device but they must be activated by either something you know or something you are or both

🔶 **Example:** The OTP is displayed on the device and manually input for transmission to the verifier, thereby proving possession and control of the device. An OTP device may, for example, display 6 characters at a time.

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                                                                                      |                                        ⚠️Severity                                         |                🗡️Attacks                |   🔗Sources   |
| :-: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------: | :-------------------------------------: | :-----------: |
|  1  | <em>Verify:</em> Approved cryptography is used to generate the secret that will be shared with the authenticator </br> <em>Reason:</em> Weak cryptography can be bypassed                                                                                                                    | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |             `Bruteforcing`              | [NIST](#nist) |
|  2  | <em>Verify:</em> Approved authenticated protected channel are used when collecting the OTP </br> <em>Reason:</em> Ensures that the OTP is being generated from the right device                                                                                                              | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |             `Eavesdropping`             | [NIST](#nist) |
|  3  | <em>Verify:</em> Time-based OTPs expiration is in place </br> <em>Reason:</em> Prevents the OTP from being reuse incase its stolen                                                                                                                                                           | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Theft` `Impersonation` `Replay Attack` | [NIST](#nist) |
|  4  | <em>Verify:</em> Time-based OTP can be used only once within the validity period </br> <em>Reason:</em> Prevents the OTP from being reuse incase its stolen                                                                                                                                  | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Theft` `Impersonation` `Replay Attack` | [NIST](#nist) |
|  5  | <em>Verify:</em> Symmetric keys used to verify submitted OTPs are highly protected, such as by using a hardware security module or secure operating system based key storage </br> <em>Reason:</em> Key theft can allow an attacker to generate their own secrets                            | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |         `Theft` `Impersonation`         | [NIST](#nist) |
|  6  | <em>Verify:</em> Physical single factor OTP generator can be revoked in case of theft or other loss. Ensure that revocation is immediately effective across logged in sessions, regardless of location </br> <em>Reason:</em> Prevent a malicious actor to gain access to the user's account | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Theft` `Impersonation` `Replay Attack` | [NIST](#nist) |
|  7  | <em>Verify:</em> There's a way for the verifier to establish the authenticator as a multi factor device. In the absence of this, the verifier should treat it as a single factor </br> <em>Reason:</em> Ensures that a user is choosing the right authentication factor                      | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |         `Theft` `Bruteforcing`          | [NIST](#nist) |

### 🔑 Single and Multi Factor Cryptographic Device and Software

🔶 **Definitions:**

-   A single-factor cryptographic device is a hardware device that performs cryptographic operations using protected cryptographic key(s) and provides the authenticator output via direct connection to the user endpoint
-   A Multi-factor cryptographic device is similar to single-factor cryptographic device but it must be activated by either something you know or something you are or both.
-   A single-factor cryptographic software is a cryptographic key stored on disk or some other "soft" media. Authentication is accomplished by proving possession and control of the key
-   A Multi-factor cryptographic software is similar to single-factor cryptographic software but it must be activated by either something you know or something you are or both.

🔶 **Examples:**

-   Single/Multi-factor cryptographic device:

    -   USB authenticator such as a YubiKey or Google Titan
    -   Smart cards with an embedded processor

-   Single/Multi-factor cryptographic software:

    -   Use of a client X.509 certificate

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                   |                                        ⚠️Severity                                         |        🗡️Attacks        |   🔗Sources   |
| :-: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------: | :---------------------: | :-----------: |
|  1  | <em>Verify:</em> Cryptographic keys are highly protected </br> <em>Reason:</em> Key theft can allow an attacker to generate their own secrets                             | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Theft` `Impersonation` | [NIST](#nist) |
|  2  | <em>Verify:</em> Challenge nonce is at least 64 bits in length </br> <em>Reason:</em> Minimum length that makes prediction of the value challenging                       | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |     `Bruteforcing`      | [NIST](#nist) |
|  3  | <em>Verify:</em> Challenge nonce is unique for each authenticator </br> <em>Reason:</em> Ensures that more than one authenticators are not used for a single user account | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |     `Impersonation`     | [NIST](#nist) |
|  4  | <em>Verify:</em> Approved cryptographic algorithms are used in the generation, seeding, and verification </br> <em>Reason:</em> Unapproved algorithms can be bypassed     | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |     `Bruteforcing`      | [NIST](#nist) |

## <ins>Something you are</ins>

### 🧬 Biometric

🔶 **Definition:** The use of biometrics in authentication includes both measurement of physical characteristics and behavioral characteristics of a user

🔶 **Example:**

-   Facial recognition
-   Finger print scan
-   Iris scan
-   Typing cadence

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                                                                                   |                                        ⚠️Severity                                         |                             🗡️Attacks                             |   🔗Sources   |
| :-: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------: | :-----------: |
|  1  | <em>Verify:</em> Biometric authenticators are limited to use only as secondary factors in conjunction with either something you have and something you know </br> <em>Reason:</em> False match rate in Biometric isn't strong enough to be used as a single factor                        | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Impersonation` <span style="opacity:0">`xxxxxxxxxxxxxxxx`</span> | [NIST](#nist) |
|  2  | <em>Verify:</em> Sensor or endpoint is authenticated prior to capturing the biometric sample from the user </br> <em>Reason:</em> Prevent the user of fraudulent devices                                                                                                                  | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                          `Impersonation`                          | [NIST](#nist) |
|  3  | <em>Verify:</em> Biometric system allows no more than 5 consecutive failed authentication attempts </br> <em>Reason:</em> Limit the occurrence of impersonation attacks                                                                                                                   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                          `Impersonation`                          | [NIST](#nist) |
|  4  | <em>Verify:</em> After 5 consecutive failed attempts disable authentication for 30 seconds before next attempt and increase exponentially with each successive failed attempt or disable the biometric user authentication and offer another factor </br> <em>Reason:</em> Limit guessing | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                          `Bruteforcing`                           | [NIST](#nist) |
|  5  | <em>Verify:</em> Integrity of the endpoint or sensor can be determined so any sensor or endpoint change can be detected </br> <em>Reason:</em> Prevent an attacker from installing a fraudulent device to bypass biometric check                                                          | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                          `Impersonation`                          | [NIST](#nist) |

**🔗 References:**

Open Web Application Security Project (OWASP):

-   <a href="https://github.com/OWASP/ASVS/blob/master/4.0/en/0x11-V2-Authentication.md#v2-authentication" target="_blank" id="asvs">Application Security Verification Checklist - Authentication</a>
-   <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" target="_blank" id="cs-auth">Authentication Cheat Sheet</a>
-   <a href="https://cheatsheetseries.owasp.org/cheatsheets/Choosing_and_Using_Security_Questions_Cheat_Sheet.html" target="_blank" id="cs-sq">Security Question Cheat Sheet</a>

National Institute of Standards and Technology (NIST) SP 800-63B:

-   <a href="https://pages.nist.gov/800-63-3/sp800-63b.html#5-authenticator-and-verifier-requirements" target="_blank" id="nist">5 Authenticator and Verifier Requirements</a>
