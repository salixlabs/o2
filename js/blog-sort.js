function sortBlogPosts() {
    const blogPosts = document.querySelector('.blog-posts');
    const posts = Array.from(blogPosts.getElementsByClassName('blog-post-preview'));
    
    posts.sort((a, b) => {
        const dateA = new Date(a.querySelector('time').textContent);
        const dateB = new Date(b.querySelector('time').textContent);
        return dateB - dateA; // Sort in descending order (newest first)
    });
    
    // Clear and re-append posts in sorted order
    posts.forEach(post => blogPosts.appendChild(post));
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', sortBlogPosts); 