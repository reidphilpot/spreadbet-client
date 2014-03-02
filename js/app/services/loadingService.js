define(function () {
    'use strict';

    function LoadingService() {
        this._loading = false;
        this._semaphore = 0;
    }

    LoadingService.prototype.setLoading = function (loading) {
        if (loading) {
            this._semaphore++;
            this._loading = true;
        } else {
            this._semaphore = Math.max(this._semaphore - 1, 0);
            if (this._semaphore === 0) {
                this._loading = false;
            }
        }
    };

    LoadingService.prototype.getLoading = function () {
        return this._loading;
    };

    return new LoadingService();
});