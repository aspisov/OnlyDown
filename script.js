// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get all download buttons (both in hero and CTA sections)
    const downloadButtons = document.querySelectorAll('.btn:not(.btn-secondary)');
    
    // Get share button
    const shareButton = document.querySelector('.btn-secondary');

    // Add click handlers to all download buttons
    downloadButtons.forEach(button => {
        button.addEventListener('click', handleDownload);
    });

    // Add click handler to share button
    if (shareButton) {
        shareButton.addEventListener('click', handleShare);
    }
});

// Handle download button clicks
function handleDownload(e) {
    e.preventDefault();
    
    // Replace this URL with your actual game download link
    const downloadUrl = 'https://www.kaggle.com/api/v1/datasets/download/crawford/resnet50';
    
    // Create a visual feedback effect
    const button = e.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);

    // Open download link in new tab
    window.open(downloadUrl, '_blank');
}

// Handle share button click
async function handleShare(e) {
    e.preventDefault();
    
    // Create share data
    const shareData = {
        title: 'ONLY DOWN',
        text: 'Check out this awesome game where every choice matters - especially the bad ones!',
        url: window.location.href
    };

    // Create a visual feedback effect
    const button = e.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 200);

    try {
        // Try to use the Web Share API if available
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback to copying the URL to clipboard
            await navigator.clipboard.writeText(window.location.href);
            
            // Create and show a temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Link copied to clipboard!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--neon-cyan);
                color: var(--dark-bg);
                padding: 10px 20px;
                border-radius: 5px;
                font-family: 'Press Start 2P', cursive;
                font-size: 12px;
                z-index: 1000;
                animation: fadeIn 0.3s ease-in-out;
            `;
            
            document.body.appendChild(tooltip);
            
            // Remove tooltip after 2 seconds
            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease-in-out';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        }
    } catch (err) {
        console.error('Error sharing:', err);
    }
}

// Add these animations to your CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%); }
        to { opacity: 0; transform: translate(-50%, -40%); }
    }
`;
document.head.appendChild(style);