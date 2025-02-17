Feature: Login de usuario

@SignUpUser
    Scenario: Registrar usuario con credenciales válidas
		Given el usuario está en la página de login
		When ingresa su usuario y contraseña
        And damos click en el boton Sing Up
		Then debería la alerta indicando registro exitoso
		
@loginSuccessful
	Scenario: Iniciar sesión con credenciales válidas
		Given el usuario está en la página de login
		When ingresa su usuario y contraseña "password123"
		And da click en el boton Log in
		Then debería ver el mensaje de bienvenida
	
@loginToNavigation
	Scenario: Iniciar sesión con credenciales existentes
		Given el usuario está en la página de login
		When ingresa su usuario personal "Erick.Kling0@yahoo.com" y contraseña "password123"
		And da click en el boton Log in
		Then el usuario "Erick.Kling0@yahoo.com" debería acceder a la pagina principal