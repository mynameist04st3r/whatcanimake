// import { hash, compare } from '@uswriting/bcrypt';
// const knex = require('knex')(require('./knexfile.js')['development']);

// exports.registerUser = async (username, password) => {
//   const hashedPassword = await hash(password, 10);
//   try {
//     await knex('users').insert({username, password: hashedPassword});
//     return {success: true, message: 'User registered successfully'};
//   } catch (error) {
//     console.error(error);
//     return {success: false, message: 'Error registering user'};
//   }
// };

// exports.loginUser = async (username, password) => {
//   try {
//     const user = await knex('users').where({username}).first();
//     if (!user) {
//       return {success: false, message: 'Invalid username or password'};
//     }
//     const isValidPassword = await compare(password, user.password);
//     if (!isValidPassword) {
//       return {success: false, message: 'Invalid username or password'};
//     }
//     return {success: true, message: 'User logged in successfully'};
//   } catch (error) {
//     console.error(error);
//     return {success: false, message: 'Error logging in user'};
//   }
// }


// try {
//   // Hash the password
//   const hashedPassword = hash(password, costFactor);
//   console.log("Hashed Password:", hashedPassword);

//   // Verify the password against the hash
//   const isValid = compare(password, hashedPassword);
//   console.log("Password verification:", isValid);
// } catch (err) {
//   console.error("Error:", err);
// }


// const costFactor = 10;
// const password = "mySecretPassword";

