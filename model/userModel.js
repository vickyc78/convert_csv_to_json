module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        // Model attributes are defined here
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
            // allowNull defaults to true
        },
        address: {
            type: Sequelize.JSON,
            // allowNull: false
        },
        additional_info: {
            type: Sequelize.JSON,
        },
        createdAt:Sequelize.DATE,
        updatedAt:Sequelize.DATE
    });

    return User;
}