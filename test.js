if (checkIfUserExists(username)) {
    const passwordHash = hashPassword(password);
    const isValid = checkCredentialsInStore(username, passwordHash);
    if (!isValid) {
        return new Error("Invalid Username or Password!");
    }
} else {
    return new Error("Invalid Username or Password!");
}




const passwordHash = hashPassword(password);
const isValid = checkCredentialsInStore(username, passwordHash);
if (!isValid) {
    return new Error("Invalid Username or Password!");
}