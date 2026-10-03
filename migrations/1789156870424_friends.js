/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('friendships', {
        id: 'id',
        requester_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE',
        },
        addressee_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE',
        },
    }, { ifNotExists: true });

    pgm.addConstraint('friendships', 'no_self_friendship', 'CHECK (requester_id <> addressee_id)');

    pgm.addConstraint('friendships', 'unique_friendship', 'UNIQUE (requester_id, addressee_id)');

    pgm.createIndex('friendships', 'requester_id', { name: 'idx_friendships_requester' });
    pgm.createIndex('friendships', 'addressee_id', { name: 'idx_friendships_addressee' });
    pgm.createTable('friends', {
        user_id1: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE',
        },
        user_id2: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    }, { ifNotExists: true });
    pgm.addConstraint('friends', 'friends_pkey', {
        primaryKey: ['user_id1', 'user_id2'],
    });
    pgm.addConstraint('friends', 'ordered_pair', 'CHECK (user_id1 < user_id2)');
    pgm.createIndex('friends', 'user_id2', { name: 'idx_friends_user2' });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
