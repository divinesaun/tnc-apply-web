document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const formMessage = document.getElementById('formMessage');
  
    // Listen for form submission
    postForm.addEventListener('submit', (event) => {
      event.preventDefault();  // Prevent default form submission behavior
  
      // Capture form data
      const prompt = document.getElementById('prompt').value.trim()
      // Clear any existing messages
      formMessage.textContent = '';
  
      // Validate form fields (basic validation)
      if (!prompt) {
        formMessage.textContent = 'Please fill in both fields.';
        formMessage.style.color = 'red';
        return;
      }
  
      // Prepare data to send (as a JSON object)
      const postData = {
        "prompt": prompt // Hard-coded user ID for demonstration
      };
  
      // Send POST request to the test API endpoint
      fetch('https://tnc-apply.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
        
            formMessage.innerHTML = `${data.answer.replace(/\n/g, '<br>')}`;
        
            formMessage.style.color = 'green';
              
              // Optionally, reset the form after a successful post
            postForm.reset();
        })
        .catch(error => {
          // Display error message
          formMessage.textContent = `Error submitting post: ${error.message}`;
          formMessage.style.color = 'red';
        });
    });
  });