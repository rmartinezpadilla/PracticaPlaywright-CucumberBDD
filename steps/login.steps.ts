import { Given, When, Then } from "@cucumber/cucumber";
//import { expect } from "@playwright/test";
const { expect } = require('chai');
import CustomWorld from "../support/world";
import { faker } from "@faker-js/faker";

const email = faker.internet.email();

    Given("el usuario está en la página de login", async function (this: CustomWorld) {
        await this.openBrowser();
        await this.page.goto("https://www.demoblaze.com/");
    });

    When("ingresa su usuario y contraseña {string}", async function (this: CustomWorld, password: string) {
        const logInMain = this.page.locator("#login2");
        await logInMain.click();
        await this.page.fill("#loginusername", email);
        await this.page.fill("#loginpassword", password);
    });

    When('da click en el boton Log in', async function (this: CustomWorld) {
        const logInButtonForm = this.page.getByRole("button", { name: "log in" });
        await logInButtonForm.click();        
        });

    Then("debería ver el mensaje de bienvenida", async function (this: CustomWorld) {
        //await this.page.locator("#nameofuser")
        // Esperar a que el elemento aparezca antes de interactuar
        await this.page.waitForSelector("#nameofuser");

        // Seleccionar el elemento
        const elementoBienvenida = this.page.locator("#nameofuser");

        // Capturar el texto
        const mensajeBienvenida = await elementoBienvenida.textContent();

        // Verificar si es nulo y limpiar espacios
        const textoCapturado = mensajeBienvenida ? mensajeBienvenida.trim() : "";

        // Imprimir para depuración
        console.log(`Texto capturado: "${textoCapturado}"`);

        // Verificar si el texto es el esperado
        expect(textoCapturado?.trim()).to.equal(`Welcome ${email}`);  

    });
    
    When('ingresa su usuario personal {string} y contraseña {string}', async function (this: CustomWorld, usuario: string, password: string) {
        const logInMain = this.page.locator("#login2");
        await logInMain.click();
        await this.page.fill("#loginusername", usuario);
        await this.page.fill("#loginpassword", password);
    });
    When('ingresa su usuario y contraseña', async function (this: CustomWorld){
        const signUpButton = this.page.locator("#signin2");
        await signUpButton.click();        
        await this.page.fill("#sign-username", email);
        await this.page.fill("#sign-password", "password123");
    });

    When('damos click en el boton Sing Up', async function (this: CustomWorld){
        const signUp = this.page.getByRole("button", { name: "Sign up" });
        await signUp.click();
    });
    
    Then('debería la alerta indicando registro exitoso', async function (this: CustomWorld) {
        let mensajeAlerta: string;
    
        // Usamos una promesa para asegurarnos de que capturamos el mensaje correctamente
        const dialogPromise = new Promise<string>((resolve) => {
            this.page.once("dialog", async (dialog) => {
                mensajeAlerta = dialog.message();  // Asignamos el mensaje al valor de la variable
                await dialog.accept(); // Aceptamos la alerta (la cerramos)
                resolve(mensajeAlerta);  // Resolvemos la promesa con el mensaje capturado
            });
        });        
        // Esperamos que la promesa se resuelva y capturamos el mensaje de la alerta
        mensajeAlerta = await dialogPromise;
        console.log(`Mensaje de la alerta: ${mensajeAlerta}`)
        // Ahora podemos hacer la aserción con el mensaje capturado
        expect(mensajeAlerta).to.equal('Sign up successful.');  // Ajusta el mensaje esperado
    });
    
    Then('el usuario {string} debería acceder a la pagina principal', async function (this: CustomWorld, usuario: string) {
        //await this.page.locator("#nameofuser")
        // Esperar a que el elemento aparezca antes de interactuar
        await this.page.waitForSelector("#nameofuser");

        // Seleccionar el elemento
        const elementoBienvenida = this.page.locator("#nameofuser");

        // Capturar el texto
        const mensajeBienvenida = await elementoBienvenida.textContent();

        // Verificar si es nulo y limpiar espacios
        const textoCapturado = mensajeBienvenida ? mensajeBienvenida.trim() : "";

        // Imprimir para depuración
        console.log(`Texto capturado: "${textoCapturado}"`);

        // Verificar si el texto es el esperado
        expect(textoCapturado?.trim()).to.equal(`Welcome ${usuario}`);  
    });
    