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
        avatar_url: { type: 'TEXT' },
    }, { ifNotExists: true });

    pgm.createIndex('users','id',{ name: 'idx_users_id' });

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

    // ---- conversations ----
    pgm.createTable('conversations', {
        id: 'bigserial',
        user_one_id: {
            type: 'bigint',
            notNull: true,
            references: '"users"(id)',
            onDelete: 'CASCADE',
        },
        user_two_id: {
            type: 'bigint',
            notNull: true,
            references: '"users"(id)',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()'),
        },
    }, { ifNotExists: true });

    pgm.addConstraint('conversations', 'conversations_pkey', {
        primaryKey: 'id',
    });

    // всегда храним меньший ID первым - это защита от дублей
    pgm.addConstraint('conversations', 'ordered_users', {
        check: 'user_one_id < user_two_id',
    });

    pgm.addConstraint('conversations', 'unique_pair', {
        unique: ['user_one_id', 'user_two_id'],
    });

    pgm.createIndex('conversations', 'user_one_id', { name: 'idx_conversations_user_one' });
    pgm.createIndex('conversations', 'user_two_id', { name: 'idx_conversations_user_two' });

    // ---- private_messages ----
    pgm.createTable('private_messages', {
        id: 'bigserial',
        conversation_id: {
            type: 'bigint',
            notNull: true,
            references: '"conversations"(id)',
            onDelete: 'CASCADE',
        },
        sender_id: {
            type: 'bigint',
            notNull: true,
            references: '"users"(id)',
        },
        body: {
            type: 'text',
            notNull: true,
        },
        created_at: {
            type: 'timestamptz',
            notNull: true,
            default: pgm.func('now()'),
        },
    }, { ifNotExists: true });

    pgm.addConstraint('private_messages', 'private_messages_pkey', {
        primaryKey: 'id',
    });

    pgm.createIndex(
        'private_messages',
        [
            'conversation_id',
            { name: 'created_at', sort: 'DESC' },
        ],
        { name: 'idx_private_messages_conv_time' },
    );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropIndex('private_messages', ['conversation_id', 'created_at'], {
        name: 'idx_private_messages_conv_time',
        ifExists: true,
    });
    pgm.dropTable('private_messages', { ifExists: true, cascade: true });

    pgm.dropIndex('conversations', 'user_two_id', { name: 'idx_conversations_user_two', ifExists: true });
    pgm.dropIndex('conversations', 'user_one_id', { name: 'idx_conversations_user_one', ifExists: true });
    pgm.dropTable('conversations', { ifExists: true, cascade: true });

    pgm.dropIndex('server_users',        'user_id',   { name: 'idx_server_users_user_id',          ifExists: true });
    pgm.dropIndex('voice_chanels',       'server_id', { name: 'idx_voice_chanels_server_id',       ifExists: true });
    pgm.dropIndex('server_users',        'server_id', { name: 'idx_server_users_server_id',        ifExists: true });
    pgm.dropIndex('message_user_server', 'server_id', { name: 'idx_message_user_server_server_id', ifExists: true });

    pgm.dropTable('message_user_server', { ifExists: true, cascade: true });
    pgm.dropTable('server_users',        { ifExists: true, cascade: true });
    pgm.dropTable('voice_chanels',       { ifExists: true, cascade: true });
    pgm.dropTable('servers',             { ifExists: true, cascade: true });
    pgm.dropTable('session',             { ifExists: true, cascade: true });
    pgm.dropTable('users',               { ifExists: true, cascade: true });
};