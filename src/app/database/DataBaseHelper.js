// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('MainDB.db');

// // Function to initialize the database and create tables
// const initDatabase = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       // Create the EMPLOYEES table
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS EMPLOYEES (
//           employee_id INTEGER PRIMARY KEY,
//           name TEXT,
//           date_of_birth TEXT,
//           gender TEXT,
//           email TEXT,
//           phone TEXT,
//           address TEXT,
//           job_title TEXT,
//           role TEXT,
//           username TEXT,
//           password TEXT,
//           hire_date TEXT,
//           manager_id INTEGER,
//           FOREIGN KEY (manager_id) REFERENCES EMPLOYEES(employee_id)
//         );`,
//         [],
//         () => {
//           resolve();
//         },
//         (_, error) => {
//           reject(error);
//         }
//       );
//     });
//   });
// };

// // Function to execute a SQL query
// const executeQuery = (query, params = []) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         query,
//         params,
//         (_, result) => {
//           console.log("Query Result:", result);
//           resolve(result);
//         },
//         (_, error) => {
//           console.error("Query Error:", error);
//           reject(error);
//         }
//       );
//     });
//   });
// };


// const deleteQuery = 'DELETE FROM EMPLOYEES';

// const clearOldData = () => {
//   executeQuery(deleteQuery)
//     .then((result) => {
//       console.log('Old data cleared successfully.');
//     })
//     .catch((error) => {
//       console.error('Error clearing old data:', error);
//     });
// };










// export { initDatabase, executeQuery,clearOldData };
