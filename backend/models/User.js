// MODELE D'UTILISATEUR

class User {
    constructor(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
        this.avatar = user.avatar;
        this.admin = user.admin;
    }
}

module.exports = User;

