define(['text!./assessment.html'], function (template) {
    'use strict';

    return ['assessmentService', function (assessmentService) {
        return {
            restrict: 'EA',
            template: template,
            replace: true,
            link: function(scope) {
                scope.assessmentService = assessmentService;
            }
        };
    }];

});