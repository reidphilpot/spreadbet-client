define(['jquery', 'text!../assessment/questions.json'], function ($, questions) {

    function AssessmentService($timeout, spreadBotService, xhrService, securityService, $routeParams) {
        this.spreadBotService = spreadBotService;
        this.xhrService = xhrService;
        this.$timeout = $timeout;
        this.securityService = securityService;
        this.$routeParams = $routeParams;
        this.question = {};
        this.questions = [];
    }

    AssessmentService.$inject = ['$timeout', 'spreadBotService', 'xhrService', 'securityService', '$routeParams'];

    AssessmentService.prototype.start = function() {
        this.reset();
        $('#assessment').modal();

        if(this.questions.length) {
            return;
        }

        this.xhrService.getQuestions(this.$routeParams.gameId, this.securityService.loggedInUser.username).then(function(questions) {
            this.questions = questions.data;
        }.bind(this));
    };

    AssessmentService.prototype.canNavigateBackwards = function () {
        return this.questions.indexOf(this.question) > 0;
    };

    AssessmentService.prototype.canNavigateForwards = function () {
        return this.question && this.questions.indexOf(this.question) < this.questions.length - 1 && this.question.selected;
    };

    AssessmentService.prototype.next = function () {
        this.question = this.questions[Math.min(this.questions.indexOf(this.question) + 1, this.questions.length - 1)];
    };

    AssessmentService.prototype.prev = function () {
        this.question = this.questions[Math.max(this.questions.indexOf(this.question) - 1, 0)];
    };

    AssessmentService.prototype.onLastQuestion = function () {
        return this.question === this.questions[this.questions.length-1];
    };

    AssessmentService.prototype.submitAnswers = function () {
        this.completed = true;

        var payload = {
            answers: this.questions.map(function(q) { return q.selected })
        };

        this.xhrService.submitAnswers(this.$routeParams.gameId, this.securityService.loggedInUser.username, payload).then(function(data) {
            this.$timeout(this.displayResults.bind(this, data));
        }.bind(this));
    };

    AssessmentService.prototype.displayResults = function(result) {
        var passed = result.passed;
        var correct = result.correct;

        if(passed) {
            this.result = 'Congratulations you correctly answered ' + correct + ' questions' +
                ' out of ' + this.questions.length + ' and passed the test. You may continue playing the game for fun.';
        } else {
            this.result = 'Sorry you only scored ' + correct + ' out of ' + this.questions.length + '' +
                ' and failed the test this time. Try running another simulation and then attempt the test again.';
        }
    };

    AssessmentService.prototype.reset = function() {
        this.questions.forEach(function(q) {
            delete q.selected;
        });
        this.question = null;
        this.result = null;
    };

    AssessmentService.prototype.title = function() {
        if(this.result) {
            return 'Result';
        } else if(this.question) {
            return 'Question ' + (this.questions.indexOf(this.question) + 1);
        } else {
            return 'Introduction';
        }
    };

    return AssessmentService;

});