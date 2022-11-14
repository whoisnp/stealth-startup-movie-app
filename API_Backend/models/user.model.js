module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        uid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
        },
        token: {
            type: Sequelize.STRING,
        }
    });
    return Users;
};