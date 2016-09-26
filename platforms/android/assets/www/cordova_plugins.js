cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "cordova-plugin-device-motion.Acceleration",
        "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "Acceleration"
        ]
    },
    {
        "id": "cordova-plugin-device-motion.accelerometer",
        "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
        "pluginId": "cordova-plugin-device-motion",
        "clobbers": [
            "navigator.accelerometer"
        ]
    },
    {
        "id": "cordova-plugin-shake.Shake",
        "file": "plugins/cordova-plugin-shake/www/shake.js",
        "pluginId": "cordova-plugin-shake",
        "clobbers": [
            "shake"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-vibration": "2.1.2",
    "cordova-plugin-device-motion": "1.2.2",
    "cordova-plugin-shake": "0.5.4",
    "cordova-plugin-whitelist": "1.3.0"
};
// BOTTOM OF METADATA
});