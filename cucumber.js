module.exports = {
    default: {
        timeout: 10000,  // 10 segundos de espera
        require: ["steps/*.ts", "support/world.ts"],  // 💡 Agrega "support/world.ts"
        requireModule: ["ts-node/register"],
        format: ["json:reports/cucumber-report.json", "progress"],
        paths: ["features/**/*.feature"]
    }
}; 

