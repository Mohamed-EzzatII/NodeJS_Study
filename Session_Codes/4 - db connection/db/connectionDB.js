import mysql from 'mysql2';

// Create a connection pool

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'users_posts'
}
);

connection.connect((err) => {
    if(err){
        console.log(err);
    }else{ 
        console.log('Connected to the database');
    }
});

export default connection;