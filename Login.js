document.addEventListener('DOMContentLoaded', function() {

    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const togglePassword = document.querySelector('.toggle-password');
    const loginButton = document.querySelector('.login-button');
    const buttonText = document.querySelector('.button-text');
    const loadingIcon = document.querySelector('.loading-icon');

   
    togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            passwordInput.type = 'password';
            this.classList.replace('fa-eye', 'fa-eye-slash');
        }
    });

    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#4a6bff';
            this.parentElement.querySelector('.icon').style.color = '#4a6bff';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '#333';
            this.parentElement.querySelector('.icon').style.color = '#777';
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#4a6bff';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });

    
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        
       
        buttonText.textContent = 'Authenticating...';
        loadingIcon.style.display = 'block';
        this.disabled = true;
        
        
        setTimeout(() => {
            
            if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
                buttonText.textContent = 'Please fill all fields!';
                this.style.backgroundColor = 'var(--error-color)';
                loadingIcon.style.display = 'none';
               
                setTimeout(() => {
                    buttonText.textContent = 'Login';
                    this.style.backgroundColor = 'var(--primary-color)';
                    this.disabled = false;
                }, 2000);
                return;
            }
            
            
            buttonText.textContent = 'Login Successful!';
            this.style.backgroundColor = 'var(--success-color)';
            loadingIcon.style.display = 'none';
            
           
            setTimeout(() => {
                window.location.href = 'dashboard.html'; 
            }, 1500);
        }, 1500);
    });
});