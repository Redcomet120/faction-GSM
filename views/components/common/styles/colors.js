var _ = require('lodash');
// Colors to be shared throughout all components
var hexToRGB = function(hex, opacity){
    var reg = /#([\dA-F][\dA-F])([\dA-F][\dA-F])([\dA-F][\dA-F])/gi;
    var match = reg.exec(hex);

    return 'rgba(' +
        parseInt(match[1], 16) + ', ' +
        parseInt(match[2], 16) + ', ' +
        parseInt(match[3], 16) + ', ' +
        (_.isNumber(opacity) ? opacity : '1') + ')';
};

module.exports = {
    white: hexToRGB.bind(this, '#FFFFFF'),
    red: hexToRGB.bind(this, '#BA1111'),
    black: hexToRGB.bind(this, '#000000'),
    blue: hexToRGB.bind(this, '#1111BA'),
    darkGreen: hexToRGB.bind(this, '#11BA11'),
    lightGreen: hexToRGB.bind(this, '#44ED44')
};
