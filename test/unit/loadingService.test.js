define(['../../js/app/services/loadingService.js'], function(loadingService) {

    describe("Loading Service Tests", function () {

        it("should set loading correctly", function() {
            loadingService.setLoading(true);
            loadingService.setLoading(true);
            expect(loadingService._loading).toBe(true);
            loadingService.setLoading(false);
            expect(loadingService._loading).toBe(true);
            loadingService.setLoading(false);
            expect(loadingService._loading).toBe(false);
        });

        it("semaphore should not be negative", function() {
            loadingService.setLoading(true);
            loadingService.setLoading(false);
            loadingService.setLoading(false);
            expect(loadingService._semaphore).toBe(0);
        });


    });

});

