const message = document.getElementById('message');
const authenticateBtn = document.getElementById('authenticate-btn');

authenticateBtn.addEventListener('click', () => {
    if (window.PublicKeyCredential) {
        navigator.credentials.get({
            publicKey: {
                allowCredentials: [{
                    type: 'public-key',
                    id: new Uint8Array(16),
                    transports: ['internal']
                }],
                challenge: new Uint8Array(32),
                rpId: window.location.hostname,
                userVerification: 'required',
                authenticatorSelection: {
                    userVerification: 'required'
                },
                timeout: 60000,
                attestation: 'none'
            }
        }).then(() => {
            message.innerText = '¡Autenticación exitosa con huella digital!';
        }).catch((error) => {
            message.innerText = 'Error en la autenticación biométrica: ' + error;
        });
    } else {
        message.innerText = 'Tu navegador no es compatible con la autenticación biométrica.';
    }
});
