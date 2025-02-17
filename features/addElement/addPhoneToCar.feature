Feature: Agregar télefono al carrito de compra

    # Background:     
    #     # Escenario de Inicio de Sesión        
	# 	Given el usuario está en la página de login
	# 	When ingresa su usuario personal "Erick.Kling0@yahoo.com" y contraseña "password123"
	# 	And da click en el boton Log in
	# 	Then el usuario "Erick.Kling0@yahoo.com" debería acceder a la pagina principal

    @agregarTelefonoAlCarrito
    Scenario Outline: Verificar funcionalidad después de registro e inicio de sesión
        Given el usuario está en la página de login
		When ingresa su usuario personal "Erick.Kling0@yahoo.com" y contraseña "password123"
		And da click en el boton Log in
		Then el usuario "Erick.Kling0@yahoo.com" debería acceder a la pagina principal
        Given da clic en la opcion phones del menu principal
        When agrega "<phone>" al carrito de compras 
        Then debería visualizarse en el carrito de compras
    
    Examples:
    | phone               |
    | Samsung galaxy s6      |
    | Nokia lumia 1520       |
    # | Sony xperia z5         |
    # | Iphone 6 32gb          |