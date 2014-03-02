define(function () {
    'use strict';

    function SubscriptionService() {
        this._subscriptions = {};
        this._subscriptionCounters = {};
        this._totalSubscriptions = 0;
    }

    /**
     *
     * @param topic
     * @param cb
     * @returns {string}
     */
    SubscriptionService.prototype.subscribe = function (topic, cb) {
        this.validateTopic(topic);

        var subscriptionId = this.nextSubscriptionIdForTopic(topic);

        if (!this._subscriptions[topic]) {
            // create object whose keys will be subscriptions ids
            this._subscriptions[topic] = {};
        }

        // add callback to subscriptions under the topic and unique subscription id
        this._subscriptions[topic][subscriptionId] = cb;

        this._totalSubscriptions++;

        console.info('registering subscription ' + subscriptionId);

        return subscriptionId;
    };

    /**
     *
     * @param subscriptionId
     */
    SubscriptionService.prototype.unsubscribe = function (subscriptionId) {
        console.info('removing subscription ' + subscriptionId);

        var topic = this.topicFromSubscriptionId(subscriptionId);
        var subs = this._subscriptions[topic];

        if (this._subscriptions[topic]) {
            delete subs[subscriptionId];
            if (Object.keys(subs).length === 0) {
                delete this._subscriptions[topic];
            }
            this._subscriptionCounters[topic] = Math.max(this._subscriptionCounters[topic] - 1, 0);
            this._totalSubscriptions = Math.max(this._totalSubscriptions - 1, 0);
        }
    };

    /**
     * Publish a notification to a topic, passing the supplied data to each
     * subscribed callback function.
     * @param topic
     * @param data
     */
    SubscriptionService.prototype.publish = function (topic, data) {
        console.info('publishing to topic', topic, data);

        var subscribers = this._subscriptions[topic];

        for (var subscriptionId in subscribers) {
            if(subscribers.hasOwnProperty(subscriptionId)){
                subscribers[subscriptionId](data);
            }
        }
    };

    /**
     * Generates the next unique subscription id for a topic.
     *
     * Subscription ids will be of the format <topic>-<counter> where <counter>
     * is an incrementing integer unique to the topic.
     *
     * @param topic
     * @returns {string}
     */
    SubscriptionService.prototype.nextSubscriptionIdForTopic = function (topic) {
        if (!this._subscriptionCounters[topic]) {
            // initialize subscription counter for the topic
            this._subscriptionCounters[topic] = 0;
        }

        return topic + '#' + (this._subscriptionCounters[topic]++);
    };

    /**
     * Sanitises a string to be used as the topic part of a subscription id.
     * @param topic
     * @returns {*}
     */
    SubscriptionService.prototype.sanitiseTopic = function (topic) {
        return topic.replace(/[#]/g, '');
    };

    /**
     * Validates a topic to see if it contains any invalid characters.
     * @param topic
     * @returns {boolean}
     */
    SubscriptionService.prototype.validateTopic = function (topic) {
        var result = topic === this.sanitiseTopic(topic);

        if (!result) {
            throw 'Topic string contains invalid characters: ' + topic;
        }

        return result;
    };

    /**
     * Extracts the topic from a generated subscription id
     * @param subscriptionId
     * @returns {*}
     */
    SubscriptionService.prototype.topicFromSubscriptionId = function (subscriptionId) {
        var parts = subscriptionId.split('#');

        // validate parts
        if (parts.length !== 2) {
            throw 'Invalid subscriptionId format: ' + subscriptionId;
        }

        return parts[0];
    };

    /**
     * Returns an associative array of all subscriptions to a topic, indexed by subscription id.
     * @param topic
     * @returns {*}
     */
    SubscriptionService.prototype.subscriptionsForTopic = function (topic) {
        this.validateTopic(topic, true);

        return this._subscriptions[topic];
    };

    return {
        Subscription: SubscriptionService,
        subscriptionService: new SubscriptionService()
    };

});