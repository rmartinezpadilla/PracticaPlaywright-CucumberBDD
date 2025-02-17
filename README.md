# Práctica Playwright usando cucumber BDD
## 1. Instalar Dependencias
Abre una terminal y sigue estos pasos:
    
### Paso 1: Crear un proyecto y configurar Node.js
Si aún no tienes un proyecto Node.js, créalo con:
```
    mkdir playwright-cucumber-bdd
    cd playwright-cucumber-bdd
    npm init -y
```
### Paso 2: Instalar Playwright
**Ejecuta:**
```
    npm install --save-dev @playwright/test
    npx playwright install
    
```
### Paso 3: Instalar Cucumber y sus dependencias
Instala Cucumber y el adaptador de Playwright para usarlo con BDD:
```
npm install --save-dev @cucumber/cucumber playwright-cucumber-steps
```
**Nota:** playwright-cucumber-steps es una librería que ayuda a integrar Playwright con Cucumber.

### Paso 4: Instalar otros paquetes útiles
Para trabajar con TypeScript y generar reportes en HTML:
```
npm install --save-dev typescript ts-node @types/node
npm install --save-dev cucumber-html-reporter
npm install @faker-js/faker --save-dev
npm install @cucumber/cucumber cucumber-html-reporter --save-dev

```
## 2. Configurar el Proyecto
### Paso 5: Configurar TypeScript
Crea un archivo tsconfig.json en la raíz del proyecto:
```
{
    "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
    }
}
```
##  3. Escribir Pruebas con Cucumber
### Paso 6: Crear la carpeta de pruebas
Organiza tu proyecto así:
```
    playwright-cucumber-bdd/
    │── features/
    │   ├── login.feature
    │── steps/
    │   ├── login.steps.ts
    │── support/
    │   ├── world.ts
    │── cucumber.js
    │── playwright.config.ts
    │── package.json
    │── tsconfig.json
```
### Paso 7: Escribir un escenario en Cucumber
Crea el archivo features/login.feature:
```
Feature: Login de usuario
  	Scenario: Iniciar sesión con credenciales válidas
		Given el usuario está en la página de login
		When ingresa su usuario "testuser" y contraseña "password123"
		Then debería ver el mensaje de bienvenida
```

##  4. Escribir los Step Definitions
### Paso 8: Configurar el "mundo" de Cucumber
Crea support/world.ts:
El archivo quedaría de la siguiente manera:
```
import { setWorldConstructor, World, After, AfterAll } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "@playwright/test";

class CustomWorld extends World {
    browser!: Browser;
    page!: Page;

    async openBrowser() {
        console.log("🔥 Iniciando el navegador...");
        this.browser = await chromium.launch({ headless: false });
        this.page = await this.browser.newPage();
    }
}

// Cerrar el navegador después de cada escenario
After(async function (this: CustomWorld) {
    console.log("❌ Cerrando el navegador después de cada escenario...");
    await this.page.close();
    await this.browser.close();
});

// Acción final después de ejecutar todos los escenarios
AfterAll(async function () {
    console.log("🧹 Finalizando pruebas y limpiando recursos...");
    // Aquí podrías limpiar logs, cerrar conexiones, etc.
});

setWorldConstructor(CustomWorld);
export default CustomWorld;


```
**Explicación:**
```
import { setWorldConstructor, World } from "@cucumber/cucumber"; 
/*
World: Clase base de Cucumber que se usa para compartir datos entre los steps.
setWorldConstructor: Función que permite definir una clase personalizada que reemplaza a World.
*/
import { Page, Browser, chromium } from "@playwright/test";
/*
Browser: Representa un navegador que Playwright controla.
Page: Representa una pestaña o página dentro del navegador.
chromium: Permite lanzar el navegador Chromium con Playwright.
*/

class CustomWorld extends World {
/*
Se define CustomWorld, que extiende la clase World de Cucumber.
Esto permite agregar propiedades y métodos personalizados.
*/
  browser!: Browser;
  page!: Page;
/*
browser!: Define una propiedad browser de tipo Browser, que se usará para abrir el navegador.
page!: Define una propiedad page de tipo Page, que se usará para interactuar con la web.
El ! indica que estas variables serán inicializadas antes de su uso.

*/
  async openBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }
/*
	•	openBrowser(): Método que inicia el navegador y abre una nueva página.
	•	chromium.launch({ headless: false }): Inicia un navegador visible (modo no headless).
	•	this.browser.newPage(): Abre una nueva pestaña en el navegador.
    Modo headless significa que el navegador no tiene interfaz gráfica, útil para ejecución en servidores.
*/
  async closeBrowser() {
    await this.browser.close();

/*
closeBrowser(): Cierra el navegador cuando las pruebas terminan.
await this.browser.close(): Asegura que el navegador se cierre correctamente.

*/
  }
}

setWorldConstructor(CustomWorld);

/*
setWorldConstructor(CustomWorld): Le dice a Cucumber que use CustomWorld en lugar de la clase World por defecto.
*/

/*
Resumen
	•	Se define una clase CustomWorld que hereda de World de Cucumber.
	•	Se agregan propiedades browser y page para manejar Playwright.
	•	Se crean los métodos openBrowser() y closeBrowser() para abrir y cerrar el navegador.

*/
```
### Paso 9: Implementar los Steps
*Crea steps/login.steps.ts:*
```
    import { Given, When, Then } from "@cucumber/cucumber";
    import { expect } from "@playwright/test";
    import CustomWorld from "../support/world";

    Given("el usuario está en la página de login", async function (this: CustomWorld) {
    await this.openBrowser();
    await this.page.goto("https://ejemplo.com/login");
    });

    When("ingresa su usuario {string} y contraseña {string}", async function (this: CustomWorld, username: string, password: string) {
    await this.page.fill("#username", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
    });

    Then("debería ver el mensaje de bienvenida", async function (this: CustomWorld) {
    const welcomeMessage = await this.page.textContent("#welcome");
    expect(welcomeMessage).toContain("Bienvenido");
    await this.closeBrowser();
    });
```
##  5. Configurar Cucumber para Playwright
### Paso 10: Configurar Cucumber
Crea cucumber.js:
```
module.exports = {
    default: {
        require: ["steps/*.ts", "support/world.ts"],  // 💡 Agregar "support/world.ts"
        requireModule: ["ts-node/register"],
        format: ["json:reports/cucumber-report.json", "progress"]
    }
}; 

```
##  6. Configurar el Runner de Playwright
### Paso 11: Configurar Playwright
Crea playwright.config.ts:
```
    import { defineConfig } from '@playwright/test';

    export default defineConfig({
    testDir: './steps',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
    },
    });
```
##  7. Ejecutar las Pruebas
### Paso 12: Correr las pruebas
**Ejecuta:**
    ```
    npx cucumber-js
    ```
##  8. Generar Reportes en HTML
### Paso 13: Crear script para reportes
Modifica package.json y agrega:
```
"scripts": {
  "test": "npx cucumber-js && node generate-report.js",
  "report": "node generate-report.js"
}
```
### Paso 14: Crear script generate-report.js
Crea generate-report.js:
```
const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber-report.json", // Archivo JSON generado por Cucumber
  output: "reports/cucumber-report.html",  // Archivo HTML final
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Test Environment": "QA",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);

```
### Paso 15: Generar el reporte
**Ejecuta:**
    ```
    npm run report
    ```
    
Esto generará reports/cucumber-report.html y lo abrirá en el navegador.

##  Resumen de Comandos
### 1.  Instalar dependencias
    npm install --save-dev @playwright/test @cucumber/cucumber playwright-cucumber-steps typescript ts-node cucumber-html-reporter
### 2.  Ejecuta rpruebas
    npx cucumber-js
### 3.  Ejecuta rpruebas según su etiqueta
    npx cucumber-js --tags @SignUpUser
    npx cucumber-js --tags="@SignUpUser or @loginSuccessful"
### 4.  Generar reporte html
    npm run report 
    npm run generate-report
