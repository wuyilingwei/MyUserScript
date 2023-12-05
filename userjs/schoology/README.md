# Contains the following features: (maybe more will be added as I use schoology)

Modular design for easy modification and installation according to individual needs, and enabled only on the corresponding page to reduce the performance footprint.

Please install function modules as required.

## 1. Automatic login

### Save password version

[Click here Install](https://github.com/yige-yigeren/YigerenUserScript/raw/main/userjs/schoology/Schoology_Auto_login_Spwd.user.js)

The Script will automatically save the password to the User Script Manager, and the User Script Manager will automatically fill in the password when you visit the login page and click login.

I not upload password to any server, and the password is stored in the browser's local storage(Use Base64 Encode).

Please note that this may lead to password leakage and sharing (but if your browser storage is no longer secure, then your entire device has most likely been compromised).

### Only Click version

[Click here Install](https://github.com/yige-yigeren/YigerenUserScript/raw/main/userjs/schoology/Schoology_Auto_login_OCli.user.js)

The browser is required to autofill the password.

In some browsers (e.g. Edge), for reasons I don't understand, you may need to click anywhere on the page for their autofill to actually fill in the fill box.

If your browser is like this, I prefer the saved password version.

## 2. The course interface automatically expands all items

[Click here Install](https://github.com/yige-yigeren/YigerenUserScript/raw/main/userjs/schoology/Schoology_Auto_expand.user.js)

*This feature may affect its original behavior. For example, the loading animation will not disappear after the loading is completed, so the script will automatically remove all loading animations.

*Too many levels (>=4), and there are too many items (>=20) may result in too many requests, and some items may not be expanded normally.
