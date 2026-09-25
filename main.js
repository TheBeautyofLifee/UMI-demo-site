
function copyLinkFromInput(buttonElement) {
        const container = buttonElement.parentElement;
        const copyInput = container.querySelector('.copy-input');
        
        navigator.clipboard.writeText(copyInput.value).then(() => {
            const originalMarkup = buttonElement.innerHTML;
            
            buttonElement.innerHTML = '<i class="fa-solid fa-check"></i>';
            container.classList.add('copied-state');
            buttonElement.disabled = true;

            setTimeout(() => {
                buttonElement.innerHTML = originalMarkup;
                container.classList.remove('copied-state');
                buttonElement.disabled = false;
            }, 1800);
        }).catch(err => {
            console.error('Execution failure on copy utility: ', err);
        });
}


function openQrModal(url, portalName) {
    const modal = document.getElementById('qrModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalUrlDisplay = document.getElementById('modalUrlDisplay');
    const qrCodeImage = document.getElementById('qrCodeImage');

    // Update modal contents dynamically
    if (portalName) {
        modalTitle.textContent = `${portalName} QR Code`;
    }
    modalUrlDisplay.textContent = url;
    
    // Generate QR Code dynamic image URL
    qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

    // Show modal and disable background scrolling
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQrModal(event) {
    // If event is passed, close only when clicking backdrop or close button directly
    if (!event || event.target.classList.contains('modal-backdrop') || event.target.closest('.modal-close-btn')) {
        const modal = document.getElementById('qrModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape keypress
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeQrModal();
    }
});