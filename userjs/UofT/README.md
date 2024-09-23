# Contains the following features: (maybe more will be added as I use)

Modular design for easy modification and installation according to individual needs, and enabled only on the corresponding page to reduce the performance footprint.

Please install function modules as required.

## 1. Automatic login IDPZ

### Save password version

[Click here Install](https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/UofT/Auto_login_idpz_Spwd.user.js)

This User js is for U of T's idpz student/faculty login system, automate it and don't have to do anything.

The Script will automatically save the password to the User Script Manager, and the User Script Manager will automatically fill in the password when you visit the login page and click login.

I not upload password to any server, and the password is stored in the browser's local storage(Use Base64 Encode).

Please note that this may lead to password leakage (but if your browser storage is no longer secure, then your entire device has most likely been compromised).

This script has been modified from the Schoology version to fit the idpz login system and the beautified overlay box.

~~Damn, can't they set an automatic login? I need log into the school's websites at least ten times per day.~~


## 2. No waiting fk PCRS server running

[Click here Install](https://github.com/wuyilingwei/MyUserScript/raw/refs/heads/main/userjs/UofT/No_waiting_fk_server.user.js)

Remove the overlay of the running program. You don't have to wait for the server to respond. You can write the next question first.
