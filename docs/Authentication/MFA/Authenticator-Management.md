---
hide:
    - footer
---

A number of events can occur over the lifecycle of a subscriber’s authenticator that affect that authenticator’s use. These events include authenticator registration, verification, reset, and loss. This section describes the actions to be taken in response to those events.

## 🍎 General Policies

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                                                                        |                                        ⚠️Severity                                         |                                    🗡️Attacks                                    |                     🔗Sources                      |
| :-: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :------------------------------------------------: |
|  1  | **<ins>Verify</ins>:** All authenticator related events are logged. Such as registering new authenticator, authenticator lost, incorrect authenticator value etc. </br> **<ins>Reason</ins>:** Trigger alerts when abnormal events occur. Also, helauth with investigations    | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Insufficient Logging` <span style="opacity:0">`xxxxxxxxxxxxxxxxxxxxxxx`</span> | [OWASP CS](#cs-auth), [ASVS](#asvs), [NIST](#nist) |
|  2  | **<ins>Verify</ins>:** All user supplied input i.e. PINs, secrets, code etc., should never be trusted and must be validated </br> **<ins>Reason</ins>:** Prevention against injection or Denial of Service (DOS) attacks                                                       | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                           `SQLi` `LDAPi` `XSS` `DoS`                            |                [OWASP CS](#cs-auth)                |
|  3  | **<ins>Verify</ins>:** TLS (HTTauth) and `Strict-Transport-Security` header are enable for every authentication process </br> **<ins>Reason</ins>:** Network traffic is encrypted which helauth prevents eavesdropping                                                         | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                                 `Eavesdropping`                                 |        [OWASP CS](#cs-auth), [ASVS](#asvs)         |
|  4  | **<ins>Verify</ins>:** Rate limiting mechanisms exist </br> **<ins>Reason</ins>:** Prevention against guessing and DoS                                                                                                                                                         | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                            `Bruteforing` </br> `DoS`                            | [OWASP CS](#cs-auth), [ASVS](#asvs), [NIST](#nist) |
|  5  | **<ins>Verify</ins>:** At least two factors can be used. "something you know" must be following by either a "something you have" or "something you are" </br> **<ins>Reason</ins>:** Decreases the likelihood of account compromise since possession of two factor is needed   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                                     `Theft`                                     | [OWASP CS](#cs-auth), [ASVS](#asvs), [NIST](#nist) |
|  6  | **<ins>Verify</ins>:** The website should maintain a record of all authenticators that are associated with an account </br> **<ins>Reason</ins>:** Helauth with revocation and deletion of authenticators                                                                      | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                                     `Theft`                                     |                   [NIST](#nist)                    |
|  7  | **<ins>Verify</ins>:** Email notifications must be sent for sensitive operations such as authenticator registration, reset, lost and account lockout </br> **<ins>Reason</ins>:** Incase the user didn't authorize these operations, the notification will alert them about it | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                                 `Impersonation`                                 | [OWASP CS](#cs-auth), [ASVS](#asvs), [NIST](#nist) |

## 🔨 Authenticator Registration

Following items must be considered for authenticator registration process.

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                                     |                                              ⚠️Severity                                              |          🗡️Attacks          |   🔗Sources   |
| :-: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------: | :-------------------------: | :-----------: |
|  1  | **<ins>Verify</ins>:** Website supports at least two factors</br> **<ins>Reason</ins>:** Two or more factors are more secure than only one factor                                                                                           |      <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>       | `Bruteforcing` </br>`Theft` | [NIST](#nist) |
|  2  | **<ins>Verify</ins>:** Authenticator registration should take place either during user registration or when the user chooses </br> **<ins>Reason</ins>:** Decision up to the website owner to make                                          | <span style="background-color:#4097c2; border-radius: 3px; padding: 2px 3px; ">Informational </span> |             ⛔              | [NIST](#nist) |
|  3  | **<ins>Verify</ins>:** If a user tries to register an authenticator, they should be reauthenticated by using the existing factor </br> **<ins>Reason</ins>:** Confirm that the actual user is registering an authenticator not someone else |      <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>       |       `Impersonation`       | [NIST](#nist) |
|  4  | **<ins>Verify</ins>:** Guidelines for the [Type](./Types.md) of authenticator being registered are considered </br> **<ins>Reason</ins>:** Ensure that unique security policies for each authenticator are considered                       |      <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>       |             ⛔              | [NIST](#nist) |
|  5  | **<ins>Verify</ins>:** Authenticator expiration should be set </br> **<ins>Reason</ins>:** Prevent an attacker to have access forever                                                                                                       |      <span style="background-color:#6e9642; border-radius: 3px; padding: 2px 3px;">Low </span>       |   `Impersonation` `Theft`   | [NIST](#nist) |

## 🚦 Authenticator Verification

Following items that be considered for authenticator verification process.

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                          |                                          ⚠️Severity                                           |                          🗡️Attacks                          |   🔗Sources   |
| :-: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------: | :---------------------------------------------------------: | :-----------: |
|  1  | **<ins>Verify</ins>:** If authenticator expiration policy exists, stop the execution and return an expired message if the authenticator is expired </br> **<ins>Reason</ins>:** Limit the use of resources                       | <span style="background-color:#ad8c07; border-radius: 3px; padding: 2px 3px; ">Medium </span> | `Theft` <span style="opacity:0">`xxxxxxxxxxxxxxxxxx`</span> | [NIST](#nist) |
|  2  | **<ins>Verify</ins>:** Authenticator verification should happens after [Memorized Secret](Types.md#something-you-know) </br> **<ins>Reason</ins>:** Revealing information to an attacker about which second factor is being used |  <span style="background-color:#6e9642; border-radius: 3px; padding: 2px 3px; ">Low </span>   |                    `Information Leakage`                    | [NIST](#nist) |
|  3  | **<ins>Verify</ins>:** Authenticator verification should take place in a limited time</br> **<ins>Reason</ins>:** Less time an attacker has to respond                                                                           |   <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>   |                   `Impersonation` `Theft`                   | [NIST](#nist) |
|  4  | **<ins>Verify</ins>:** An account is locked after a certain number of failed attempts</br> **<ins>Reason</ins>:** Limit the use of guessing                                                                                      |   <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>   |                        `Bruteforing`                        | [NIST](#nist) |

## 🔃 Authenticator Reset

Following items must be considered for authenticator reset process.

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                      |                                        ⚠️Severity                                         |                           🗡️Attacks                           |   🔗Sources   |
| :-: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------: | :-----------------------------------------------------------: | :-----------: |
|  1  | **<ins>Verify</ins>:** User should be reauthenticated before an authenticator reset takes place </br> **<ins>Reason</ins>:** Ensure that the actual user is making a change not someone else                                 | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Impersonation` <span style="opacity:0">`xxxxxxxxxxxx`</span> | [NIST](#nist) |
|  2  | **<ins>Verify</ins>:** User is required to verify the authenticator's output before it is accepted </br> **<ins>Reason</ins>:** Ensure the possession of the authenticator                                                   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                    `Impersonation` `Theft`                    | [NIST](#nist) |
|  3  | **<ins>Verify</ins>:** Guidelines for the [Type](./Types.md) of authenticator being registered must be considered </br> **<ins>Reason</ins>:** Ensure that unique security policies for each authenticator are considered    | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                              ⛔                               | [NIST](#nist) |
|  4  | **<ins>Verify</ins>:** Once a new authenticator is established, the website should revoke the previous authenticator </br> **<ins>Reason</ins>:** Incase an attacker gets a hold of the old authenticator, it shouldn't work | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                    `Impersonation` `Theft`                    | [NIST](#nist) |

## 😕 Authenticator Lost

Following items must be considered for authenticator lost process.

📝 **Security Checklist:**

| #️⃣  | ✅Items                                                                                                                                                                                                                                                                                                     |                                        ⚠️Severity                                         |                                🗡️Attacks                                 |   🔗Sources   |
| :-: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: | :-----------: |
|  1  | **<ins>Verify</ins>:** When a user reports an authenticator lost, they should be reauthenticated </br> **<ins>Reason</ins>:** Confirm that the actual user is making the lost claim not someone else                                                                                                        | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> | `Impersonation` <span style="opacity:0">`xxxxxxxxxxxxxxxxxxxxxxx`</span> | [NIST](#nist) |
|  2  | **<ins>Verify</ins>:** If a user reports a lost authenticator during the verification stage at login, a PIN or token URL strategy from [Reset Password](../UserID-Passwords.md#password-reset) must be followed</br> **<ins>Reason</ins>:** Establish a secure way for a user to change their authenticator | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                         `Impersonation` `Theft`                          | [NIST](#nist) |
|  3  | **<ins>Verify</ins>:** After a successful identity check, the website must ask the user to register a new authenticator </br> **<ins>Reason</ins>:** Replace the lost authenticator                                                                                                                         | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                         `Impersonation` `Theft`                          | [NIST](#nist) |
|  4  | **<ins>Verify</ins>:** The lost authenticator no longer works with the user's account </br> **<ins>Reason</ins>:** Incase an attacker gets a hold of the authenticator, it shouldn't work                                                                                                                   | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span> |                         `Impersonation` `Theft`                          | [NIST](#nist) |

**🔗 References:**

Open Web Application Security Project (OWASP):

-   <a href="httauth://github.com/OWASP/ASVS/blob/master/4.0/en/0x11-V2-Authentication.md#v2-authentication" target="_blank" id="asvs">Application Security Verification Checklist - Authentication</a>
-   <a href="httauth://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" target="_blank" id="cs-auth">Authentication Cheat Sheet</a>

National Institute of Standards and Technology (NIST) SP 800-63B:

-   <a href="httauth://pages.nist.gov/800-63-3/sp800-63b.html#5-authenticator-and-verifier-requirements" target="_blank" id="nist">5 Authenticator and Verifier Requirements</a>
