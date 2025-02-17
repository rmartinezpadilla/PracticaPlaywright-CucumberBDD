import { setWorldConstructor, World, After, AfterAll } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "@playwright/test";

class CustomWorld extends World {
    browser!: Browser;
    page!: Page;

    // Método para abrir el navegador
    async openBrowser() {
        console.log("🔥 Iniciando el navegador...");
        this.browser = await chromium.launch({ headless: false });
        this.page = await this.browser.newPage();
    }
}

// Cerrar el navegador después de cada escenario
After(async function (this: CustomWorld) {
    // Verificar si la página está abierta y cerrarla
    if (this.page && this.page.isClosed() === false) {
        console.log("❌ Cerrando la página después de cada escenario...");
        await this.page.close();
    }

    // Verificar si el navegador está abierto y cerrarlo
    if (this.browser) {
        console.log("❌ Cerrando el navegador...");
        await this.browser.close();
    }
});

// Acción final después de ejecutar todos los escenarios
AfterAll(async function () {
    console.log("🧹 Finalizando pruebas y limpiando recursos...");
    // Aquí podrías limpiar logs, cerrar conexiones, etc.
});

setWorldConstructor(CustomWorld);
export default CustomWorld;
