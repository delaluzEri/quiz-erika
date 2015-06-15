/**
 * Created by Erika on 11/06/2015.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz',
        {
            pregunta:   DataTypes.STRING,
            respuesta:  DataTypes.STRING,
        });
}