const fs = require("fs");
var shell = require('shelljs');

const config = JSON.parse(fs.readFileSync('src/config.json', 'utf8'));
if(!shell.test("-d", 'services')) {
    shell.mkdir('services');
}
shell.cd('services');
config.services.forEach(service => {
    if(shell.test("-d", service.name)) {
        shell.cd(service.name);
        shell.exec('git pull')
        shell.cd("..");
        return;
    } else {
        shell.exec(`git clone ${service.git} ${service.name}`)
    }
    if(shell.test("-f", `${service.name}/package.json`)) {
        shell.cd(service.name);
        shell.exec("yarn");
        shell.cd("..");
    }
})