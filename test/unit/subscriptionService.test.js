define(['../../js/app/services/subscriptionService.js'], function(Subscription) {

    describe("Socket Subscription Tests", function () {

        var subscriptionService;

        beforeEach(function () {
            subscriptionService = new Subscription();
        });

        it("Topic name is valid", function () {
            var topics = ['test', 't', 'test_1', 'test.1', 'test/1'];

            for (var i = 0; i < topics.length; i++) {
                var topic = topics[i];
                var result = subscriptionService.validateTopic(topic);
                expect(result).toBe(true);
            }
        });

        it("sanitise topic succeeds", function () {
            expect(subscriptionService.sanitiseTopic("test")).toEqual("test");
            expect(subscriptionService.sanitiseTopic("test#1")).toEqual("test1");
            expect(subscriptionService.sanitiseTopic("/test/1234#1234")).toEqual("/test/12341234");
            expect(subscriptionService.sanitiseTopic("/test/1234#1234#1234")).toEqual("/test/123412341234");
        });

        it("subscribe returns valid subscription id", function () {
            var topics = [['topic1', 'topic1#0'], ['test', 'test#0'], ['t', 't#0']];

            for (var i = 0; i < topics.length; i++) {
                expect(subscriptionService.subscribe(topics[i][0], null)).toEqual(topics[i][1]);
            }
        });

        it("subscribe adds to collection of subscribers", function () {
            var topics = ['test', 't'];

            for (var i = 0; i < topics.length; i++) {
                var topic = topics[i];
                var id = subscriptionService.subscribe(topic, null);
                var subs = subscriptionService.subscriptionsForTopic(topic);
                expect(id in subs).toBe(true);
            }
        });

        it("unsubscribe removes from collection of subscribers", function () {
            subscriptionService.subscribe("test", null);
            subscriptionService.subscribe("t", null);

            var ids = ['test#1', 't#1'];

            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var topic = id.split("#")[0];

                subscriptionService.unsubscribe(id);
                var subs = subscriptionService.subscriptionsForTopic(topic);

                if(subs) {
                    expect(id in subs).toBe(false);
                }
            }
        });

        it("publish executes registered callback function", function () {
            var callbackExecuted = false;

            subscriptionService.subscribe("test", function (data) {
                callbackExecuted = true;
                expect(data).toEqual("success");
            });

            subscriptionService.publish("test", "success");
        });
    });

});

