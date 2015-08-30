'use strict';


/**
 * The Admin adjustments list service
 */








/**
 * Export list service
 * @param   {Object} services  base classes from apiService
 * @param   {express|object} app      express or headless app
 * @returns {listItemsService}
 */
exports = module.exports = function(services, app) {

    var service = new services.list(app);




    /**
     * Create the query with filters
     *
     * @param {array} params      query parameters if called by controller
     * @param {function} next
     *
     */
    function getQuery(params, next) {


        var find = service.app.db.models.Adjustment.find({});
        find.populate('right');
        find.where('user', params.user);

        next(find);

    }










    /**
     * Call the adjustment list service
     *
     * @param {Object} params
     * @param {function} [paginate]  Optional parameter to paginate the results
     *
     * @return {Promise}
     */
    service.getResultPromise = function(params, paginate) {

        if (undefined === params || !params.user) {
            service.error('The user parameter is mandatory');
            return service.deferred.promise;
        }


        getQuery(params, function(query) {


            service.resolveQuery(
                query,
                paginate,
                function(err, docs) {
                    if (service.handleMongoError(err))
                    {
                        service.outcome.success = true;
                        service.deferred.resolve(docs);
                    }
                }
            );
        });


        return service.deferred.promise;
    };


    return service;
};




