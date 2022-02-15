/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('links', {
    id: { type: 'varchar(14)', notNull: true, primaryKey: true },
    link: { type: 'text', notNull: true },
    createdAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });

  pgm.createTable('clicks', {
    id: 'id',
    linkId: { type: 'varchar(14)', notNull: true, references: '"links"', onDelete: 'cascade' },
    createdAt: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });

  pgm.createIndex('clicks', 'linkId');
};

exports.down = (pgm) => {
  pgm.dropIndex('clicks', 'linkId');

  pgm.dropTable('clicks');

  pgm.dropTable('links');
};
