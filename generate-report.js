const reporter = require('cucumber-html-reporter');

// Configura el reporte HTML
const options = {
    theme: 'bootstrap', // O usa otro tema si lo prefieres
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber-report.html',
    reportSuiteAsScenarios: true,
    launchReport: true
};

// Genera el reporte HTML
reporter.generate(options);
