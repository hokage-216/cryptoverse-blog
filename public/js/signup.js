const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const username = document.querySelector("#username-signup").value.trim();
  
    if (email && password && username) {
      // Send the e-mail, password, and username to the server
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password, username: username }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response.user);
        alert('Sign up successful!');
        document.location.replace('/');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to sign up');
      }
    }
  };
  
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);