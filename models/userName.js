module.exports = (sequelize, dataType) => {
    const userName = sequelize.define("userName", {
        id: {
            type: dataType.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataType.STRING,
        },
        email:{
            type: dataType.STRING,
            validate : {
                isEmail : true,
            }
        },
        score: {
            type : dataType.INTEGER,
            allowNull:false
        }
    });

    return userName;
};