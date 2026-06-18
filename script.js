document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('userName');
    const certificateTextInput = document.getElementById('certificateText');
    const generatePdfButton = document.getElementById('generatePdf');
    const displayUserName = document.getElementById('displayUserName');
    const displayText = document.getElementById('displayText');
    const currentDateSpan = document.getElementById('currentDate');
    const certificatePreview = document.getElementById('certificate');

    // Set current date
    const today = new Date();
    currentDateSpan.textContent = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Update certificate preview on input change
    userNameInput.addEventListener('input', updateCertificatePreview);
    certificateTextInput.addEventListener('input', updateCertificatePreview);

    function updateCertificatePreview() {
        displayUserName.textContent = userNameInput.value || '[Your Name]';
        displayText.textContent = certificateTextInput.value || '[Certificate Text]';
        if (userNameInput.value || certificateTextInput.value) {
            certificatePreview.style.display = 'flex';
        } else {
            certificatePreview.style.display = 'none';
        }
    }

    generatePdfButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const certificateText = certificateTextInput.value.trim();

        if (!userName || !certificateText) {
            alert('Please enter both your name and certificate text.');
            return;
        }

        console.log('Generate PDF button clicked.'); // Debugging line

        // Update the preview one last time before generating PDF
        updateCertificatePreview();

        const element = document.getElementById('certificate');
        const opt = {
            margin:       10,
            filename:     `Certificate_${userName.replace(/\s/g, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, logging: true, useCORS: true, allowTaint: true }, // Added allowTaint to html2canvas options
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            console.log('PDF generation complete.');
        }).catch(error => {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please check the console for more details.');
        });
    });

    // Initial update to show placeholder if inputs are empty
    updateCertificatePreview();
});
