const fs = require('fs');
const yaml = require('yaml');

const loadTestConfig = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return filePath.endsWith('.yaml') || filePath.endsWith('.yml')
        ? yaml.parse(fileContent)
        : JSON.parse(fileContent);
}

module.exports = { loadTestConfig };
