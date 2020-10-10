import PostgresStore from './postgres-store.js'
import config from './server.config.js'
import featureFlag from './featureFlags.js'

async function dropEverything() {
    const result = await PostgresStore.client.query(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public';"
    )
    for (const row of result.rows) {
        await PostgresStore.client.query(`DROP TABLE IF EXISTS "${row.tablename}" cascade`)
    }
}

async function generateTable() {
    await PostgresStore.client.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY,description VARCHAR(255) NOT NULL,finished BOOLEAN NOT NULL);')
}

async function main() {
    PostgresStore.init(config.postgres).then(() => {
        PostgresStore.testConnect(config.postgres).then(() => {
            if (featureFlag.TABLE === 'DROP') {
                console.log('Drop table')
                dropEverything().then(() => {
                    process.exit(0)
                })
            } else if ( featureFlag.TABLE === 'CREATE'){
                console.log('Create table')
                generateTable().then(() => {
                    process.exit(0)
                })
            } else {
                console.log('Missing feature flag')
                process.exit(0)
            }
        })
    })
}

main()
    .then(() => {
    })
    .catch((err) => {
        console.error('Error: %s', err);
        console.error('Error: %s', err.stack);
    })
