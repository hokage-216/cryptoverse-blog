const addPostHandler = async (event) => {
    event.preventDefault();

    // Gather the data from the form elements on the page
    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();
  
    if (postTitle && postContent) {
      // Send the new blog post title and content to the database
      const response = await fetch('/api/blog/new-post', {
        method: 'POST',
        body: JSON.stringify({ title: postTitle, content: postContent }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response);
        alert('Post submission successful!');
        document.location.replace('/api/user/dashboard');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to create post. Please try again.');
      }
    };
};

document.querySelector('#addpost-form').addEventListener('submit', addPostHandler);