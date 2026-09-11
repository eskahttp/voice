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
    pgm.createTable('users', {
        id: 'id',
        login: { type: 'varchar(28)', notNull: true },
        nickname: { type: 'varchar(26)', notNull: true },
        email: { type: 'varchar(100)', notNull: true },
        password: { type: 'varchar(120)', notNull: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    }, { ifNotExists: true });
    pgm.createTable('voice_chanels', {
        id: 'id',
        server_id: {
            type: 'integer',
            notNull: true,
        },
        name: { type: 'VARCHAR(26)', notNull: true },
    }, { ifNotExists: true });
    pgm.createTable('session', {
        id: 'id',
        login_id: {
            type: 'integer',
            notNull: true,
        },
        cookie: { type: 'TEXT', notNull: true },
    }, { ifNotExists: true });
    pgm.createTable('servers', {
        id: 'id',
        creator_id: {
            type: 'integer',
            notNull: true,
        },
        name: {
            type: 'VARCHAR(20)',
            notNull: true
        },
        referal:{
            type: 'TEXT',
            notNull: true,
        },
    }, { ifNotExists: true });
    pgm.createTable('server_users', {
        id: 'id',
        server_id: {
            type: 'integer',
            notNull: true,
        },
        user_id: {
            type: 'integer',
            notNull: true
        },
    }, { ifNotExists: true });
    pgm.addConstraint('server_users', 'unique_combination', 'UNIQUE (server_id, user_id)');
    pgm.createTable('message_user_server', {
        id: 'id',
        server_id: {
            type: 'integer',
            notNull: true,
        },
        user_id: {
            type: 'integer',
            notNull: true
        },
        message:{
            type: 'TEXT',
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    }, { ifNotExists: true });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
