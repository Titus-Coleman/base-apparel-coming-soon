import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const form = document.querySelector('form');
const emailInput = document.querySelector('input[name="email"]');

let isFormValid = false;

const validateInputs = () => {
    if (!isValidEmail(emailInput.value)) {
        emailInput.classList.add("invalid");
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("warning--icon").classList.remove("hidden");
        console.log('bad email');
    } else {
        emailInput.classList.remove("invalid");
        document.getElementById("error").classList.add("hidden");
        document.getElementById("warning--icon").classList.add("hidden");
        console.log('good email');
    }
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
    document.getElementById('form').reset();
});

