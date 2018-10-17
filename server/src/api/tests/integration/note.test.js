/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
// const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const { some, omitBy, isNil, first } = require('lodash');
const app = require('../../../index');
const User = require('../../models/user.model');
const Note = require('../../models/note.model');

/**
 * root level hooks
 */
async function format(note) {
  // get notes from database
  const dbNote = (await Note.findOne({ content: note.content })).transform();

  // remove null and undefined properties
  return omitBy(dbNote, isNil);
}

describe('Notes API', () => {
  let adminAccessToken;
  let userAccessToken;
  let dbUsers;
  let dbNotes;
  let note;

  beforeEach(async () => {
    const password = '123456';
    const passwordHashed = await bcrypt.hash(password, 1);

    dbUsers = {
      branStark: {
        email: 'branstark@gmail.com',
        password: passwordHashed,
        name: 'Bran Stark',
        role: 'admin',
      },
      jonSnow: {
        email: 'jonsnow@gmail.com',
        password: passwordHashed,
        name: 'Jon Snow',
      },
    };

    dbNotes = {
      firstNote: {
        name: 'First note',
        content: 'First note content',
        type: 'note',
      },
      secondNote: {
        name: 'Second note',
        content: 'Second note content',
        type: 'link',
      },
    };

    note = {
      name: 'New note',
      content: 'New note content',
      type: 'note',
    };

    await User.remove({});
    await User.insertMany([dbUsers.branStark, dbUsers.jonSnow]);

    await Note.remove({});
    const userId = (await User.findOne({}))._id;
    await Note.insertMany([
      { ...dbNotes.firstNote, userId },
      { ...dbNotes.secondNote, userId },
    ]);

    dbUsers.branStark.password = password;
    dbUsers.jonSnow.password = password;

    adminAccessToken = (await User.findAndGenerateToken(dbUsers.branStark))
      .accessToken;
    userAccessToken = (await User.findAndGenerateToken(dbUsers.jonSnow))
      .accessToken;
  });

  describe('POST /v1/notes', () => {
    it('should create a new note when request is ok', () => {
      return request(app)
        .post('/v1/notes')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(note)
        .expect(httpStatus.CREATED)
        .then(res => {
          expect(res.body).to.include(note);
        });
    });

    it('should create a new note and set default type to "note"', () => {
      return request(app)
        .post('/v1/notes')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(note)
        .expect(httpStatus.CREATED)
        .then(res => {
          expect(res.body.type).to.be.equal('note');
        });
    });

    it('should report error when create note without content', () => {
      delete note.content;

      return request(app)
        .post('/v1/notes')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(note)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('content');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"content" is required');
        });
    });

    // TODO: max name <= 256
    // TODO: user can create notes (userAccessToken)
  });

  describe('GET /v1/notes', () => {
    // TODO: each user can see only own notes
    it('should get all notes created by admin', () => {
      return request(app)
        .get('/v1/notes')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK)
        .then(async res => {
          const firstNote = await format(dbNotes.firstNote);
          const secondNote = await format(dbNotes.secondNote);

          // before comparing it is necessary to convert String to Date
          res.body[0].createdAt = new Date(res.body[0].createdAt);
          res.body[1].createdAt = new Date(res.body[1].createdAt);

          const includesFirstNote = some(res.body, firstNote);
          const includesSecondNote = some(res.body, secondNote);

          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(includesFirstNote).to.be.true;
          expect(includesSecondNote).to.be.true;
        });
    });

    it('should get all notes with pagination', () => {
      return request(app)
        .get('/v1/notes')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ page: 2, perPage: 1 })
        .expect(httpStatus.OK)
        .then(async res => {
          const secondNote = await format(dbNotes.secondNote);

          // before comparing it is necessary to convert String to Date
          res.body[0].createdAt = new Date(res.body[0].createdAt);

          const includesSecondNote = some(res.body, secondNote);

          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          expect(includesSecondNote).to.be.true;
        });
    });

    it('should filter notes by regular expression in name field', () => {
      return request(app)
        .get('/v1/notes')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({
          name: first(dbNotes.secondNote.name.split(' ')).toLowerCase(),
        })
        .expect(httpStatus.OK)
        .then(async res => {
          const secondNote = await format(dbNotes.secondNote);

          // before comparing it is necessary to convert String to Date
          res.body[0].createdAt = new Date(res.body[0].createdAt);

          const includesSecondNote = some(res.body, secondNote);

          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          expect(includesSecondNote).to.be.true;
        });
    });

    it("should report error when pagination's parameters are not a number", () => {
      return request(app)
        .get('/v1/notes')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ page: '?', perPage: 'whaat' })
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('page');
          expect(location).to.be.equal('query');
          expect(messages).to.include('"page" must be a number');
          return Promise.resolve(res);
        })
        .then(res => {
          const { field } = res.body.errors[1];
          const { location } = res.body.errors[1];
          const { messages } = res.body.errors[1];
          expect(field).to.be.equal('perPage');
          expect(location).to.be.equal('query');
          expect(messages).to.include('"perPage" must be a number');
        });
    });
  });

  describe('GET /v1/notes/:id', () => {
    it('should get note', async () => {
      const id = (await Note.findOne({}))._id;
      return request(app)
        .get(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.include(dbNotes.firstNote);
        });
    });

    it('should report error "Note does not exist" when note does not exists', () => {
      return request(app)
        .get('/v1/notes/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });

    it('should report error "Note does not exist" when id is not a valid ObjectID', () => {
      return request(app)
        .get('/v1/notes/not-a-valid')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.equal('Note does not exist');
        });
    });

    // TODO: Must be FORBIDDEN
    it('should report error when logged user is not the requested note owner', async () => {
      const id = (await Note.findOne({}))._id;

      return request(app)
        .get(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });
  });

  describe('PUT /v1/notes/:id', () => {
    it('should replace note', async () => {
      const id = (await Note.findOne(dbNotes.secondNote))._id;

      return request(app)
        .put(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(note)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.include(note);
          expect(res.body.type).to.be.equal('note');
        });
    });

    it('should report error when content is not provided', async () => {
      const id = (await Note.findOne({}))._id;
      delete note.content;

      return request(app)
        .put(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(note)
        .expect(httpStatus.BAD_REQUEST)
        .then(res => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('content');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"content" is required');
        });
    });

    it('should report error "Note does not exist" when note does not exists', () => {
      return request(app)
        .put('/v1/notes/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(note)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });

    // TODO: Must be FORBIDDEN
    it('should report error when logged user is not the requested note owner', async () => {
      const id = (await Note.findOne({}))._id;

      return request(app)
        .put(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(note)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });
  });

  describe('PATCH /v1/notes/:id', () => {
    it('should update note', async () => {
      const id = (await Note.findOne({}))._id;
      const { name } = note;

      return request(app)
        .patch(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send({ name })
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.be.equal(name);
          expect(res.body.content).to.be.equal(dbNotes.firstNote.content);
        });
    });

    it('should not update note when no parameters were given', async () => {
      const id = (await Note.findOne(dbNotes.secondNote))._id;

      return request(app)
        .patch(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.include(dbNotes.secondNote);
        });
    });

    it('should report error "Note does not exist" when note does not exists', () => {
      return request(app)
        .patch('/v1/notes/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });

    // TODO: Must be FORBIDDEN
    it('should report error when logged user is not the requested note owner', async () => {
      const id = (await Note.findOne({}))._id;

      return request(app)
        .patch(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });
  });

  describe('DELETE /v1/notes', () => {
    it('should delete note', async () => {
      const id = (await Note.findOne({}))._id;

      return request(app)
        .delete(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NO_CONTENT)
        .then(() => request(app).get('/v1/notes'))
        .then(async () => {
          const notes = await Note.find({});
          expect(notes).to.have.lengthOf(1);
        });
    });

    it('should report error "Note does not exist" when note does not exists', () => {
      return request(app)
        .delete('/v1/notes/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });

    // TODO: Must be FORBIDDEN
    it('should report error when logged user is not the requested note owner', async () => {
      const id = (await Note.findOne({}))._id;

      return request(app)
        .delete(`/v1/notes/${id}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.code).to.be.equal(404);
          expect(res.body.message).to.be.equal('Note does not exist');
        });
    });
  });
});
