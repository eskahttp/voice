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
};
