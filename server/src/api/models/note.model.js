const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');
const { convertToRegex } = require('../utils/mongoose');
const Tag = require('./tag.model');

const { Schema, Types } = mongoose;
/**
 * Note Types
 */
const type = ['note', 'link'];

/**
 * Fields on which the search by regular expressions works.
 */
const regexSearch = ['name', 'content'];

/**
 * Note Schema
 * @private
 */
const noteSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    name: {
      type: String,
      maxlength: 256,
      index: true,
      trim: true,
    },
    type: {
      type: String,
      enum: type,
      default: 'note',
    },
    content: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      index: true,
      default: false,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  {
    timestamps: true,
  },
);

/**
 * Methods
 */
noteSchema.method({
  async transform() {
    const transformed = {};
    const fields = [
      'id',
      'name',
      'type',
      'content',
      'tags',
      'createdAt',
      'updatedAt',
    ];

    await this.populate({ path: 'tags', select: 'name color' }).execPopulate();

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  setFromObject(object) {
    Object.assign(this, object);
  },
});

/**
 * Statics
 */
noteSchema.statics = {
  type,

  /**
   * Get note
   *
   * @param {ObjectId} id   The objectId of Note
   * @returns {Promise<Note, APIError>}
   */
  async get(id) {
    try {
      let note;

      if (Types.ObjectId.isValid(id)) {
        note = await this.findById(id).exec();
      }
      if (note) {
        return note;
      }

      throw new APIError({
        message: 'Note does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get note by id and userId
   *
   * @param {ObjectId} id       The objectId of Note
   * @param {ObjectId} userId   The objectId of User
   * @returns {Promise<Note>}
   */
  async getOne(id, userId) {
    try {
      let note;

      if (Types.ObjectId.isValid(id)) {
        note = await this.findOne({ _id: id, userId }).exec();
      }
      if (note) {
        return note;
      }

      throw new APIError({
        message: 'Note does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List notes in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip     Number of notes to be skipped.
   * @param {number} limit    Limit number of notes to be returned.
   * @returns {Promise<Note[]>}
   */
  list({ page = 1, perPage = 5, userId, name, content, type }) {
    const options = omitBy({ userId, name, content, type }, isNil);
    const regex = convertToRegex(regexSearch, options);

    return this.find({ ...options, ...regex })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef Note
 */
module.exports = mongoose.model('Note', noteSchema);
