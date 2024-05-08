const editPostHandler = async (event) => {
    event.preventDefault();

    const newTitle = document.querySelector('#update-post-title').value.trim();
    const newContent = document.querySelector('#update-post-content').value.trim();
    const postId = document.querySelector('#postId').value;

    if (newTitle && newContent) {
        const response = await fetch('/api/blog/edit-post', {
            method: 'POST',
            body: JSON.stringify({ title: newTitle, content: newContent, postId: postId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log(response);
            alert('Post updated successful!');
            document.location.replace('/api/user/dashboard');
          } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to create post. Please try again.');
          }
    }
}

document.querySelector('#updatePost-form').addEventListener('submit', editPostHandler);