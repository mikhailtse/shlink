const pgp = require('pg-promise')();

const cn = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
}
const db = pgp(cn);

const links = {
  get: async (payload) => {
    if (!payload.id) {
      throw new Error('Id is not provided');
    }

    const result = await db.oneOrNone(
      'SELECT * FROM links WHERE id = ${id} FETCH FIRST 1 ROWS ONLY',
      payload,
    );

    return result;
  },
  add: async (payload) => {
    if (!payload.id) {
      throw new Error('Id is not provided');
    }
    if (!payload.link) {
      throw new Error('Link is not provided');
    }

    await db.none(
      'INSERT INTO links (id, link) values (${id}, ${link})',
      payload,
    );
  },
};

const clicks = {
  add: async (payload) => {
    if (!payload.linkId) {
      throw new Error('Link id is not provided');
    }

    await db.none(
      'INSERT INTO clicks ("linkId") values (${linkId})',
      payload,
    );
  },
};

const stats = {
  get: async (payload) => {
    const { id, startDate, endDate } = payload;

    if (!id) {
      throw new Error('Id is not provided'); 
    }

    const sql = pgp.helpers.concat([
      {
        query: 'SELECT * FROM links WHERE id = $1 FETCH FIRST 1 ROWS ONLY;',
        values: [id],
      },
      {
        query: [
          'SELECT DATE("createdAt"), COUNT(DATE("createdAt")) FROM clicks',
          'WHERE "linkId" = $1',
          startDate && endDate ? 'AND "createdAt" BETWEEN $2 AND $3' : '',
          'GROUP BY DATE("createdAt")',
        ].join(' '),
        values: [id, startDate, endDate],
      },
    ]);

    const [links, clicks] = await db.multi(sql);
    const link = links[0];

    if (!link) {
      return null;
    }

    return {
      ...link,
      clicks: clicks.map((click) => ({ ...click, count: parseInt(click.count) })),
    };
  },
};

module.exports = {
  clicks,
  links,
  stats,
};
