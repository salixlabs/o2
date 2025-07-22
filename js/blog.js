const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');

// Configure marked for security
marked.setOptions({
    headerIds: true,
    mangle: false,
    headerPrefix: 'heading-'
});

// Function to read and parse a markdown file
function processMarkdown(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const htmlContent = marked(content);
    return {
        metadata: data,
        content: htmlContent
    };
}

// Function to generate blog post HTML
function generatePostHtml(postData) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${postData.metadata.title} - OfficeTwo Blog</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/styles.css">
    <link rel="stylesheet" href="../../css/blog.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <a href="/">
                    <img src="../../Assets/O2-logo-transparent.png" alt="OfficeTwo" class="logo-image">
                    <span class="logo-text">OfficeTwo</span>
                </a>
            </div>
            <button class="mobile-nav-toggle" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul>
                <li><a href="../../#how-it-works">How It Works</a></li>
                <li><a href="../../#benefits">Benefits</a></li>
                <li><a href="../../#positions">Positions</a></li>
                <li><a href="../../pricing/">Pricing</a></li>
                <li><a href="../../faq/">FAQ</a></li>
                <li><a href="../../blog/">Resources</a></li>
                <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2EV4apkqKge60YgDrj2V7n56gxwNEy2yXWefVfPuiie42bTJWl2EXr4H_3P9-g2hgYaQ3dljOU?gv=true" class="primary-button" target="_blank">Schedule a Call</a></li>
            </ul>
        </nav>
    </header>

    <main class="blog-main">
        <article class="blog-post">
            <div class="blog-meta">
                <time>${postData.metadata.date}</time> • ${postData.metadata.author}
            </div>
            <div class="blog-content">
                ${postData.content}
            </div>
        </article>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h4>OfficeTwo</h4>
                <p>Your HR department for your second office in Buenos Aires</p>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <p><a href="mailto:info@officetwo.com">info@officetwo.com</a></p>
            </div>
            <div class="footer-section">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="https://www.youtube.com/@OfficeTwoBA" target="_blank">YouTube</a>
                    <a href="https://x.com/OfficeTwoBA" target="_blank">Twitter</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>2025 OfficeTwo. All rights reserved.</p>
        </div>
    </footer>
    <script>
        // Mobile navigation functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const navList = document.querySelector('nav ul');
            
            mobileNavToggle.addEventListener('click', function() {
                const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
                mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
                mobileNavToggle.classList.toggle('active');
                navList.classList.toggle('active');
            });
        });
    </script>
</body>
</html>`;
}

// Function to generate blog index HTML
function generateIndexHtml(posts) {
    const postsHtml = posts.map(post => `
        <article class="blog-post-preview">
            <h2><a href="posts/${post.slug}">${post.metadata.title}</a></h2>
            <div class="blog-meta">
                <time>${post.metadata.date}</time> • ${post.metadata.author}
            </div>
            <p class="blog-excerpt">${post.metadata.excerpt}</p>
            <a href="posts/${post.slug}" class="read-more">Read More →</a>
        </article>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OfficeTwo Blog - Resources and Insights</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/blog.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <a href="/">
                    <img src="../Assets/O2-logo-transparent.png" alt="OfficeTwo" class="logo-image">
                    <span class="logo-text">OfficeTwo</span>
                </a>
            </div>
            <button class="mobile-nav-toggle" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul>
                <li><a href="../#how-it-works">How It Works</a></li>
                <li><a href="../#benefits">Benefits</a></li>
                <li><a href="../#positions">Positions</a></li>
                <li><a href="../pricing/">Pricing</a></li>
                <li><a href="../faq/">FAQ</a></li>
                <li><a href="../blog/">Resources</a></li>
                <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2EV4apkqKge60YgDrj2V7n56gxwNEy2yXWefVfPuiie42bTJWl2EXr4H_3P9-g2hgYaQ3dljOU?gv=true" class="primary-button" target="_blank">Schedule a Call</a></li>
            </ul>
        </nav>
    </header>

    <main class="blog-main">
        <h1>OfficeTwo Blog</h1>
        <div class="blog-posts">
            ${postsHtml}
        </div>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h4>OfficeTwo</h4>
                <p>Your HR department for your second office in Buenos Aires</p>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <p><a href="mailto:info@officetwo.com">info@officetwo.com</a></p>
            </div>
            <div class="footer-section">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="https://www.youtube.com/@OfficeTwoBA" target="_blank">YouTube</a>
                    <a href="https://x.com/OfficeTwoBA" target="_blank">Twitter</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>2025 OfficeTwo. All rights reserved.</p>
        </div>
    </footer>
    <script>
        // Mobile navigation functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const navList = document.querySelector('nav ul');
            
            mobileNavToggle.addEventListener('click', function() {
                const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
                mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
                mobileNavToggle.classList.toggle('active');
                navList.classList.toggle('active');
            });
        });
    </script>
</body>
</html>`;
}

// Process all markdown files and generate HTML
function buildBlog() {
    const postsDir = path.join(__dirname, '../blog/posts');
    const posts = [];

    // Read all markdown files
    fs.readdirSync(postsDir)
        .filter(file => file.endsWith('.md'))
        .forEach(file => {
            const filePath = path.join(postsDir, file);
            const postData = processMarkdown(filePath);
            const slug = file.replace('.md', '');
            
            posts.push({
                slug,
                metadata: postData.metadata,
                content: postData.content
            });

            // Generate individual post HTML
            const postHtml = generatePostHtml(postData);
            const postDir = path.join(__dirname, `../blog/posts/${slug}`);
            fs.mkdirSync(postDir, { recursive: true });
            fs.writeFileSync(path.join(postDir, 'index.html'), postHtml);
        });

    // Generate index page
    const indexHtml = generateIndexHtml(posts);
    fs.writeFileSync(path.join(__dirname, '../blog/index.html'), indexHtml);
}

// Run the build
buildBlog(); 