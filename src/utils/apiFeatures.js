import { Op } from 'sequelize';

export class SequelizeFeatures {
  constructor(model, searchQuery) {
    this.model = model;
    this.searchQuery = searchQuery;
    this.sequelizeQuery = {}; // Object to hold query options
    this.paginationResult = {};
  }

  filter() {
    let filterObj = { ...this.searchQuery };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach(field => delete filterObj[field]);

    // Convert filter object keys from gt, gte, etc. to Sequelize operators
    for (let key in filterObj) {
      if (filterObj[key] instanceof Object) {
        for (let [operator, value] of Object.entries(filterObj[key])) {
          filterObj[key] = { [Op[operator]]: value };
        }
      }
    }

    this.sequelizeQuery.where = filterObj;
    return this;
  }

  sort() {
    if (this.searchQuery.sort) {
      const sortBy = this.searchQuery.sort.split(',').map(sortField => {
        return sortField.startsWith('-') ? [sortField.substring(1), 'DESC'] : [sortField, 'ASC'];
      });
      this.sequelizeQuery.order = sortBy;
    } else {
      this.sequelizeQuery.order = [['createdAt', 'DESC']];
    }
    return this;
  }

  limitedFields() {
    if (this.searchQuery.fields) {
      this.sequelizeQuery.attributes = this.searchQuery.fields.split(',').map(field => field.trim());
    } else {
      this.sequelizeQuery.attributes = { exclude: ['__v'] };
    }
    return this;
  }

  search(model) {
    if (this.searchQuery.keyword) {
      let query = {};

      if (model === "userModel") {
        query = {
          [Op.or]: [
            { name: { [Op.like]: `%${this.searchQuery.keyword}%` } },
          ]
        };
      } else if (model === "availability") {
        query = {
          [Op.or]: [
            { date: { [Op.eq]: this.searchQuery.keyword } }
          ]
        };
      } else {
        return this;
      }

      if (!this.sequelizeQuery.where) {
        this.sequelizeQuery.where = query;
      } else {
        this.sequelizeQuery.where = {
          ...this.sequelizeQuery.where,
          ...query
        };
      }
    }

    return this;
  }

  paginate(countDocuments) {
    const page = parseInt(this.searchQuery.page, 10) || 1;
    const limit = parseInt(this.searchQuery.limit, 10) || 50;
    const offset = (page - 1) * limit;

    this.sequelizeQuery.limit = limit;
    this.sequelizeQuery.offset = offset;

    this.paginationResult = {
      currentPage: page,
      limit,
      numberOfPages: Math.ceil(countDocuments / limit),
      next: page * limit < countDocuments ? page + 1 : null,
      prev: offset > 0 ? page - 1 : null
    };
    return this;
  }

  buildQuery() {
    return this.model.findAll(this.sequelizeQuery);
  }
}
