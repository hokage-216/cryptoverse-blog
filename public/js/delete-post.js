const removePostHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#postId').value;

    if (postId) {
        const response = await fetch(`/api/blog/delete-post/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Post deleted successfully!');
            document.location.replace('/api/user/dashboard');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to delete post. Please try again.');
        }
    }
}

document.querySelector('#updatePost-form').addEventListener('click', removePostHandler);