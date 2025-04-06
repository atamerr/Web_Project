document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('.form-content');
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = document.querySelectorAll('input[type="password"]')[1];
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const signinButton = document.querySelector('.signin-button');
    const buttonText = document.querySelector('.button-text');
    const loadingIcon = document.querySelector('.loading-icon');
    const passwordRequirements = document.querySelectorAll('.password-requirements li');

    
    togglePasswordIcons.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            }
        });
    });

    
    function checkPasswordRequirements(password) {
        const requirements = {
            length: password.length >= 8,
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            uppercase: /[A-Z]/.test(password)
        };

        passwordRequirements[0].classList.toggle('valid', requirements.length);
        passwordRequirements[1].classList.toggle('valid', requirements.number);
        passwordRequirements[2].classList.toggle('valid', requirements.special);
        passwordRequirements[3].classList.toggle('valid', requirements.uppercase);

        return Object.values(requirements).every(Boolean);
    }

    
    function validateField(input, condition, errorMessage) {
        const inputField = input.parentElement;
        let errorElement = inputField.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputField.appendChild(errorElement);
        }

        if (condition) {
            inputField.classList.remove('error');
            errorElement.textContent = '';
            return true;
        } else {
            inputField.classList.add('error');
            errorElement.textContent = errorMessage;
            return false;
        }
    }

    
    function validateForm() {
        let isValid = true;
        
       
        isValid = validateField(nameInput, nameInput.value.trim() !== '', 'Full name is required') && isValid;
        
        
        const emailValid = emailInput.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        isValid = validateField(emailInput, emailValid, 'Please enter a valid email') && isValid;
        
       
        const passwordValid = passwordInput.value.trim() !== '' && checkPasswordRequirements(passwordInput.value);
        isValid = validateField(passwordInput, passwordValid, 'Password does not meet requirements') && isValid;
        
        
        const confirmValid = confirmPasswordInput.value.trim() !== '' && 
                           confirmPasswordInput.value === passwordInput.value;
        isValid = validateField(confirmPasswordInput, confirmValid, 'Passwords do not match') && isValid;
        
        return isValid;
    }

    
    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', function() {
            if (input === passwordInput) {
                checkPasswordRequirements(input.value);
                validateField(input, input.value.trim() !== '', 'Password is required');
            } else if (input === confirmPasswordInput) {
                validateField(input, input.value === passwordInput.value, 'Passwords do not match');
            } else {
                validateField(input, input.value.trim() !== '', `${input.previousElementSibling.textContent} is required`);
            }
        });
    });

   
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
       
        buttonText.textContent = 'Creating Account...';
        loadingIcon.style.display = 'block';
        signinButton.disabled = true;
        
        
        setTimeout(() => {
            
            buttonText.textContent = 'Account Created!';
            signinButton.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
            loadingIcon.style.display = 'none';
            
           
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 1500);
    });

   
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = 'var(--accent-color)';
            const icon = this.parentElement.querySelector('.icon');
            if (icon) icon.style.color = 'var(--accent-color)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = 'var(--light-text)';
        });
    });
});