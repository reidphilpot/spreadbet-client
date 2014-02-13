define(function() {

    function User(config) {
        this.username = config.username;
        this.balance = config.balance;
    }

    return User;

});