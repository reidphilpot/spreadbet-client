define(['jquery'], function($) {
    'use strict';

    function BetEntry(args) {
        var $input, $wrapper;
        var defaultValue;
        var scope = this;

        this.init = function() {
            var $container = $('body');

            $wrapper = $('<div style="z-index:10000;position:absolute;background:white;padding:5px;" />').appendTo($container);
            $input = $('<input type="text" class="form-control" placeholder="Enter stake">').appendTo($wrapper);
            $('<div><button class="btn btn-sm btn-default">Submit</button><button class="btn btn-sm btn-default">Cancel</button></div>').appendTo($wrapper);

            $wrapper.find('button:first').bind('click', this.save);
            $wrapper.find('button:last').bind('click', this.cancel);
            $input.bind('keydown', this.handleKeyDown);

            scope.position(args.position);
            $input.focus().select();
        };

        this.handleKeyDown = function(e) {
            if (e.which === $.ui.keyCode.ENTER /*&& e.ctrlKey*/) {
                scope.save();
            }
            else if (e.which === $.ui.keyCode.ESCAPE) {
                e.preventDefault();
                scope.cancel();
            }
        };

        this.save = function() {
            //args.commitChanges();
            //new Bet($input.val(), args);
            scope.cancel();
        };

        this.cancel = function() {
            $input.val(defaultValue);
            args.cancelChanges();
        };

        this.hide = function() {
            $wrapper.hide();
        };

        this.show = function() {
            $wrapper.show();
        };

        this.position = function(position) {
            $wrapper.css('top', position.top).css('left', position.left);
        };

        this.destroy = function() {
            $wrapper.remove();
        };

        this.focus = function() {
            $input.focus();
        };

        this.loadValue = function(item) {
            defaultValue = item[args.column.field];
            $input.val('');
            $input.select();
        };

        this.serializeValue = function() {
            return $input.val();
        };

        this.applyValue = function(item,state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function() {
            return (!($input.val() === '' && defaultValue === null)) && ($input.val() !== defaultValue);
        };

        this.validate = function() {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    return BetEntry;

});

