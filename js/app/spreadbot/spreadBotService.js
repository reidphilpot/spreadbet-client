define(['jquery', 'bootstrap-js'], function($) {
    'use strict';

    function SpreadBotService () {
        this.showTips = false;
        this._tip = '';
    }

    SpreadBotService.prototype = Object.create(SpreadBotService.prototype, {
        tip: {
            get: function() {
                return this._tip;
            },
            set: function(value) {
                this._tip = value;
                $('#gameIntro').modal();
            }
        }
    });

    return SpreadBotService;

});