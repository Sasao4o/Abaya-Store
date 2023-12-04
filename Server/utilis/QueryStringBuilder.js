class QueryManipulation {
    constructor(queryString) {
        this.queryString = queryString;
        this.result = {};
    }

    paginate() {
        let page = this.queryString.page * 1 || 1;
        let limit = this.queryString.limit * 1|| 100;
        let skip = (page - 1) * limit;
        this.result.limit = Math.min(limit, 1000);
        this.result.offset  = skip;
        return this;
    }

  
};

module.exports = QueryManipulation;