const {createClient} = supabase;
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZ3l0ZHhhcXNsYmtyaXpjeXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MTcwMDUsImV4cCI6MTk4NjE5MzAwNX0.ybtD1ivAXolbFc2SHRMFKJ4FLmre1mwMlEf8J3CAwxI";
supabase = createClient('https://hrgytdxaqslbkrizcyqc.supabase.co', SUPABASE_KEY);

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const form = document.querySelector('form');
const emailInput = document.querySelector('input[name="email"]');
const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');

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
        return emailInput.value;
    }
};


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(validateInputs()){
        const formInput = form.querySelectorAll('input')
        let submission = {};
        formInput.forEach(element => {
            const {value, name} = element
            if (value) {
                submission[name] = value
            }
        })
       
        const {error} = await supabase.from('entries').insert([submission], {returning: 'minimal'})
        console.log(submission)
        modal.showModal();

  
    }
    
});

closeModal.addEventListener('click', ()=> {
    modal.close();
    document.getElementById('form').reset();

})