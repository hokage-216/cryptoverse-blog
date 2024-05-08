const addCommentHandler = async (event) => {
    event.preventDefault();
    
    const commentContent = document.querySelector('#comment-content').value.trim();
    const postId = document.querySelector('#postId').value;

    if (commentContent && postId) {
        const response = await fetch(`/api/blog/add-comment`, {
            method: 'POST',
            body: JSON.stringify({content: commentContent,  postId: postId}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            console.log(response);
            alert('Comment Posted!');
            window.location.reload();
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Failed to add comment. Please try again.");
        }
    };
};

document.querySelector('#comment-form').addEventListener('submit', addCommentHandler);