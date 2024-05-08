const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#update-post-title').value.trim();
    const content = document.querySelector('#update-post-content').value.trim();
    const postId = document.querySelector('#postId').value;

    if (title && content && postId) {
        const response = await fetch(`/api/blog/update-post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Post updated successfully!');
            document.location.replace('/api/user/dashboard');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to update post. Please try again.');
        }
    } else {
        alert('Please fill all fields.');
    }
}

document.querySelector('#updatePost-form').addEventListener('submit', editPostHandler);