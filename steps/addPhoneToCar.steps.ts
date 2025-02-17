import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from '@playwright/test';
import CustomWorld from "../support/world";


  Given('da clic en la opcion phones del menu principal', async function (this: CustomWorld) {
    // Seleccionar el enlace con el texto exacto 'Phones'
    const phoneLink = this.page.locator('a.list-group-item', { hasText: 'Phones' });

    // Asegurarse de que el enlace esté visible antes de hacer clic
    await expect(phoneLink).toBeVisible(); // Usamos expect de Playwright, no de Chai

    // Hacer clic en el enlace
    await phoneLink.click();

    console.log('✅ Se hizo clic en el enlace "Phones"');    
    
  });

  When('agrega {string} al carrito de compras', async function (this: CustomWorld, telefono: string) {    
    const Phone = telefono;
    let mensajeAlerta: string;

    // Crear un localizador dinámico para el producto basado en su nombre
    //const productLocator = this.page.locator(`a[href*="${Phone}"]`);
    const productLocator = this.page.locator(`//a[contains(text(),"${Phone}")]`);
    // Hacer clic en el enlace del producto
    await productLocator.click();

    // Agregar el producto al carrito    
    // Si deseas hacer clic en el botón "Add to cart" utilizando su texto
    await this.page.locator('a.btn.btn-success.btn-lg', { hasText: 'Add to cart' }).click();

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
    expect(mensajeAlerta).toEqual('Product added.')
  });  
  

  Then('debería visualizarse en el carrito de compras', async function (this: CustomWorld) {
    
  
  });