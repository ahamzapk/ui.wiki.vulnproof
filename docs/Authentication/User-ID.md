---
hide:
    - footer
---

This checklist is designed to ensure the security of user ID. It includes a series of steps and best practices for protecting user ID and preventing unauthorized access to user accounts.

## 🪪 User ID Types

The following two checklists should be considered for the identifiers that can be used as a User ID.

**Username**

| #️⃣  | ✅Items                                                                                                                                                                                           |                                         ⚠️Severity                                         |                         🗡️Attacks                          |  🔗Sources  |
| :-: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------: | :--------------------------------------------------------: | :---------: |
|  1  | **<ins>Verify</ins>:** Usernames are case insensitive </br> **<ins>Reason</ins>:** Prevent confusion between 'smith' and 'Smith'                                                                  | <span style="background-color:#6e9642; border-radius: 3px; padding: 2px 3px; ">Low </span> | `Impersonation` <span style="opacity:0">`xxxxxxxxxx`</div> | [ACS](#ACS) |
|  2  | **<ins>Verify</ins>:** Usernames are unique </br> **<ins>Reason</ins>:** Prevent a username to be used for multiple accounts                                                                      | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>  |                      `Impersonation`                       | [ACS](#ACS) |
|  3  | **<ins>Verify</ins>:** Usernames must be at least 6 characters long </br> **<ins>Reason</ins>:** Protection against guessing attacks                                                              | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>  |                       `Bruteforcing`                       | [ACS](#ACS) |
|  4  | **<ins>Verify</ins>:** Usernames are not the same as some system-reserved names such as root, admin, administrator, etc. </br> **<ins>Reason</ins>:** Prevent user from receiving high privileges | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>  |                   `Privilege Escalation`                   | [ACS](#ACS) |
|  5  | **<ins>Verify</ins>:** Disallow common and easily guessable usernames such as test, user, admin, etc. </br> **<ins>Reason</ins>:** Make it harder for an attacker to predict someone's username   | <span style="background-color:#6e9642; border-radius: 3px; padding: 2px 3px; ">Low </span> |                       `Bruteforcing`                       |     ⛔      |

**Email**

| #️⃣  | ✅Items                                                                                                                                                                                                                                                                               |                                         ⚠️Severity                                         |                       🗡️Attacks                       |   🔗Sources   |
| :-: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------: | :---------------------------------------------------: | :-----------: |
|  1  | **<ins>Verify</ins>:** Emails are no longer than 254 characters in length </br> **<ins>Reason</ins>:** Protection against denial of service                                                                                                                                           | <span style="background-color:#6e9642; border-radius: 3px; padding: 2px 3px; ">Low </span> | `DoS` <span style="opacity:0">`xxxxxxxxxxxxxxx`</div> | [IVCS](#IVCS) |
|  2  | **<ins>Verify</ins>:** Email receives a PIN for verification. The [PIN Checklist](./Password.md#forgot-password) under [Forgot Password](./Password.md#forgot-password) must be used for this </br> **<ins>Reason</ins>:** Verify that a person has access to the email they provided | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>  |                    `Impersonation`                    | [IVCS](#IVCS) |
|  3  | **<ins>Verify</ins>:** Emails are unique </br> **<ins>Reason</ins>:** Prevent an email to be used for multiple account                                                                                                                                                                | <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>  |                    `Impersonation`                    | [IVCS](#IVCS) |

## ⚖️ User ID Management

| #️⃣  | ✅Items                                                                                                                                                                                                                                     |                                          ⚠️Severity                                           |       🗡️Attacks        |   🔗Sources   |
| :-: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------: | :--------------------: | :-----------: |
|  1  | **<ins>Verify</ins>:** Perform proper input validation on the user ID </br> **<ins>Reason</ins>:** An attacker can inject malicious scripts                                                                                                 |   <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>   |      `Injection`       | [IVCS](#IVCS) |
|  2  | **<ins>Verify</ins>:** User ID is stored securely in the database by either hashing or encrypting it </br> **<ins>Reason</ins>:** In case of a data breach, user IDs are unreadable                                                         |  <span style="background-color:#6e9642; border-radius: 3px; padding: 2px 3px; ">Low </span>   |        `Theft`         |      ⛔       |
|  3  | **<ins>Verify</ins>:** Periodically review registered user IDs for suspicious entries </br> **<ins>Reason</ins>:** Ensure that registered usernames are not impersonating someone else, using profanity, or containing malicious characters | <span style="background-color:#ad8c07; border-radius: 3px; padding: 2px 3px; ">Medium </span> |  `Website Defacement`  |      ⛔       |
|  4  | **<ins>Verify</ins>:** Log and monitor user IDs during login attempts </br> **<ins>Reason</ins>:** Helps in detecting and investigating security incidences                                                                                 |   <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>   | `Insufficient Logging` |      ⛔       |
|  5  | **<ins>Verify</ins>:** Rate limiting exists on the user ID field </br> **<ins>Reason</ins>:** Prevent denial of service and guessing attacks                                                                                                |   <span style="background-color:#de3a3c; border-radius: 3px; padding: 2px 3px">High </span>   | `Bruteforcing`, `DoS`  |      ⛔       |

**🔗 Sources:**

Open Web Application Security Project (OWASP):

-   <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" target="_blank" id="ACS">[ACS] Authentication Cheat Sheet</a>
-   <a href="https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#email-address-validation" target="_blank" id="IVCS">[IVCS] Input Validation Cheat Sheet</a>
