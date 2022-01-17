const { connect } = require('mongoose');
require('dotenv').config();
const MONGO_ATLAS = process.env.MONGODB_ATLAS;
(
    async () => {
        try {
            const db = await connect('mongodb://localhost/task_app');
            console.log('Database is connected:',db.connection.name);
        } catch (error) {
            console.log(error);
        }
    }
)()
