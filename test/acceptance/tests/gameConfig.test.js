module.exports = {
    setUp : function(browser) {
        console.log('Setting up...');
    },

    "Game Configuration has correct defaults" : function (browser) {
        browser
            .url("http://localhost:5000/#/")
            .waitForElementVisible('body', 1000)
            .assert.containsText('.home-team select', 'Arsenal')
            .assert.containsText('.away-team select', 'Bayern Munich')
            .end();
    }
};