window.onload = () =>{
    let formRegistration = document.querySelector('#registration');
    let btnReset = document.querySelector('#btnReset');
    let btnSubmit = document.querySelector('#btnSubmit');
    let fname = document.querySelector('#fname');
    let lname = document.querySelector('#lname');
    let address = document.querySelector('#address');
    let bday = document.querySelector('#bday');
    let contact = document.querySelector('#contact');
    let gender = document.getElementsByName("gender");
    let medication = document.getElementsByName("medication");
    let mdHistory =  document.querySelectorAll('input[name="mdHistory"]');
    var valueGender, valueMdHistory, valueMedication;

    let months = '';
    let month = new Date().getMonth(); 
    let year = new Date().getFullYear();
    if(month < 10){
        months = '0'+month;
    }
    
    // set max date
    document.getElementById("bday").max = year+"-"+months+"-31";
    // Reset Form
    btnReset.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('form').reset();
    });

    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();

      let validFname = hasValue(fname);
      let validLname = hasValue(lname);
      let validAddress = hasValue(address);
      let validBday = hasValue(bday);
      let validContact = hasValue(contact);
      let validGender = radioValue(gender);
      let validMedication = medicationValue(medication);
      let validMdHistory = mdHistoryValue(mdHistory);
      let validContactFormat = formatPhoneNumber(contact.value);
      let valid = validFname && validLname && validAddress && validBday && validContact && validGender 
            && validMedication && validMdHistory;
      document.getElementById('contact').value = validContactFormat;

      if(valid){
        // formRegistration.submit();
        savePatient();
      }


    });

    // format phone Number
   

      const formatPhoneNumber = (input) => {
        if(!input || isNaN(input)) showError(contact, 'Input must be a number');
        if(typeof(input) !== 'string') input = input.toString()
        if(input.length === 11){
          return input;
        } else if(input.length < 11) {
            showError(contact, 'Number is too short');
         
        } else if(input.length > 11) {
            showError(contact, 'Too many numbers');
         
        }else{
            showError(contact, 'something went wrong');
        }

        return '';
      }
      

    // all field required
    const hasValue = (input) => input.value === '' ? showError(input, 'This Field is Required') : showSuccess(input, 'This Field is Required');

    // for gender
    const radioValue = (gender) => {
       
        let selected = '';
        let genderNotif =  document.getElementById('notif-gender');

        for(let i = 0; i < gender.length; i++) {
        if(gender[i].checked){
                selected=gender[i].value;
            }    
        }

        valueGender = selected;
        if(selected == ''){
            genderNotif.classList.add('text-danger');
            genderNotif.classList.remove('text-success');
            genderNotif.textContent = 'This Field is Required';
            return false;
        }else{
            genderNotif.classList.add('text-success');
            genderNotif.classList.remove('text-danger');
            genderNotif.textContent = 'Looks Good';
            return true;
        }
    }

    // for medication
    const medicationValue = (medication) => {
       
        let selected = '';
        let medicationNotif =  document.getElementById('notif-medication');

        for(let i = 0; i < medication.length; i++) {
        if(medication[i].checked){
                selected=medication[i].value;
            }    
        }

        valueMedication = selected;
        if(selected == ''){
            medicationNotif.classList.add('text-danger');
            medicationNotif.classList.remove('text-success');
            medicationNotif.textContent = 'This Field is Required';
            return false;
        }else{
            medicationNotif.classList.add('text-success');
            medicationNotif.classList.remove('text-danger');
            medicationNotif.textContent = 'Looks Good';
            return true;
        }
    }

    // for Medical History
    const mdHistoryValue = (checkValue) => {
        let history = '';
        let mdHistoryNotif =  document.getElementById('notif-mdHistory');

        for (myHistory of checkValue){
            if(myHistory.checked === true){
                history += myHistory.value + ", ";
            }
        }

        valueMdHistory = history.slice(0,-2);
        if(history === ''){
            mdHistoryNotif.classList.add('text-danger');
            mdHistoryNotif.classList.remove('text-success');
            mdHistoryNotif.textContent = 'This Field is Required';
            return false;
        }else{
            mdHistoryNotif.classList.add('text-success');
            mdHistoryNotif.classList.remove('text-danger');
            mdHistoryNotif.textContent = 'Looks Good';
            return true;
        }
    }

    // show the error message
    const showError = (input, message) => {
        // get the form-field element
        const formField = input.parentElement;
        
        
        // show the error message
        const inputBorder = formField.querySelector('input');
        // add the error class
        inputBorder.classList.remove('border-success');
        inputBorder.classList.add('border-danger');

        const error = formField.querySelector('small');
        error.classList.add('text-danger');
        error.classList.remove('text-success');
        error.textContent = message;
       
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Something's Wrong`,
          showConfirmButton: false,
          timer: 1500
        })
    };

    // show success message
    const showSuccess = (input) => {
        // get the form-field element
        const formField = input.parentElement;

        // show the error message
        const inputBorder = formField.querySelector('input');
        // add the error class
        inputBorder.classList.remove('border-danger');
        inputBorder.classList.add('border-success');

        // hide the error message
        const error = formField.querySelector('small');
        error.classList.remove('text-danger');
        error.classList.add('text-success');
        error.textContent = 'Looks Good';
        return true;
    }

    function savePatient(){
        console.log("ok");
        let valueFname = document.getElementById('fname').value;
        let valueMname = document.getElementById('mname').value;
        let valueLname = document.getElementById('lname').value;
        let valueAddress = document.getElementById('address').value;
        let valueContact = document.getElementById('contact').value;
        let valueBday = document.getElementById('bday').value;
        let valueSymtomps = [...document.querySelector('#symptoms').options].filter(optn => optn.selected).map(optn => optn.value).toString();
        

        console.log(valueFname);
        console.log(valueMname);
        console.log(valueLname);
        console.log(valueAddress);
        console.log(valueContact);
        console.log(valueBday);
        console.log(valueGender);
        console.log(valueMdHistory);
        console.log(valueSymtomps);
        console.log(valueMedication);


        let patientRegistration = [
           {
            name : `${valueFname} ${valueMname} ${valueLname}`,
            address : `${valueAddress}`,
            contact : `${valueContact}`,
            bday : `${valueBday}`,
            gender : `${valueGender}`,
            history : `${valueMdHistory}`,
            symptoms : `${valueSymtomps}`,
            medication : `${valueMedication}`
           }
        ]

        window.localStorage.setItem("Patient", JSON.stringify(patientRegistration));
        document.querySelector('form').reset();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully Registered',
            showConfirmButton: false,
            timer: 1500
          })
        setTimeout(timeOuts, 1000);
    }

    let timeOuts = () => window.location = 'result.html';
    

  }