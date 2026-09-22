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
        login:    { type: 'varchar(28)',  notNull: true },
        nickname: { type: 'varchar(26)',  notNull: true },
        email:    { type: 'varchar(100)', notNull: true },
        password: { type: 'varchar(120)', notNull: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
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
            type: 'bigint',
            notNull: true,
        },
        name: {
            type: 'varchar(20)',
            notNull: true,
        },
        referal: {
            type: 'text',
            notNull: true,
            unique: true,
        },
    }, { ifNotExists: true });

    pgm.createTable('voice_chanels', {
        id: 'id',
        server_id: {
            type: 'integer',
            notNull: true,
            references: '"servers"(id)',
            onDelete: 'CASCADE',
        },
        name: { type: 'varchar(20)', notNull: true },
    }, { ifNotExists: true });

    pgm.createTable('server_users', {
        id: 'id',
        server_id: {
            type: 'integer',
            notNull: true,
            references: '"servers"(id)',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: 'bigint',
            notNull: true,
        },
    }, { ifNotExists: true });

    pgm.addConstraint('server_users', 'unique_combination', 'UNIQUE (server_id, user_id)');

    pgm.createTable('message_user_server', {
        id: 'id',
        server_id: {
            type: 'integer',
            notNull: true,
            references: '"servers"(id)',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: 'bigint',
            notNull: true,
        },
        message: {
            type: 'text',
        },
        created_at: {
            type: 'timestamptz',
            default: pgm.func('now()'),
        },
    }, { ifNotExists: true });

    pgm.createIndex('message_user_server', 'server_id', { name: 'idx_message_user_server_server_id' });
    pgm.createIndex('server_users',        'server_id', { name: 'idx_server_users_server_id' });
    pgm.createIndex('voice_chanels',       'server_id', { name: 'idx_voice_chanels_server_id' });
    pgm.createIndex('server_users',        'user_id',   { name: 'idx_server_users_user_id' });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropIndex('server_users',        'user_id',   { name: 'idx_server_users_user_id',        ifExists: true });
    pgm.dropIndex('voice_chanels',       'server_id', { name: 'idx_voice_chanels_server_id',     ifExists: true });
    pgm.dropIndex('server_users',        'server_id', { name: 'idx_server_users_server_id',      ifExists: true });
    pgm.dropIndex('message_user_server', 'server_id', { name: 'idx_message_user_server_server_id', ifExists: true });

    pgm.dropTable('message_user_server', { ifExists: true, cascade: true });
    pgm.dropTable('server_users',        { ifExists: true, cascade: true });
    pgm.dropTable('voice_chanels',       { ifExists: true, cascade: true });
    pgm.dropTable('servers',             { ifExists: true, cascade: true });
    pgm.dropTable('session',             { ifExists: true, cascade: true });
    pgm.dropTable('users',               { ifExists: true, cascade: true });
};