module.exports = {
    selectFrom: function(table, column, value) {
        column = column ? " WHERE `" + column + "` = '" + value + "'" : "";
        return "SELECT * FROM `" + table + "`" + column;
    },
    insertInto: function(table, keys, values) {
        return "INSERT INTO `" + table + "` ( "+ keys.join(", ") + " ) values ('" + values.join("', '") + "')";
    }
};
