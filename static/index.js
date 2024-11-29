document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('#url-input');
    const resultContainer = document.createElement('div');
    resultContainer.id = 'result';
    document.body.appendChild(resultContainer);

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission

        const url = input.value;
        const submitButton = form.querySelector('button[type="submit"]');
        if (!url) {
            displayResult('Please enter a valid URL.');
            return;
        }

        // Add loading animation
        submitButton.disabled = true;
        submitButton.innerHTML = 'Loading...';
        submitButton.classList.add('loading');

        try {
            const response = await fetch('https://url-scan-api-11d8349414c2.herokuapp.com/automatic_ai_scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiJ9.870emAVSISgWX3ofXN7ChZBchtPE0YmfPLyCizI89qs`
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const formattedResult = formatResult(data);
            displayResult(formattedResult);
        } catch (error) {
            displayResult(`Error: ${error.message}`);
        } finally {
            // Remove loading animation
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit';
            submitButton.classList.remove('loading');
        }
    });

    function formatResult(data) {
        let resultHtml = '<h3>Scan Results:</h3><ul>';
        for (const [model, prediction] of Object.entries(data)) {
            const status = prediction === 1 ? 'Scam Detected' : 'No Scam';
            resultHtml += `<li><strong>${model}:</strong> ${status}</li>`;
        }
        resultHtml += '</ul>';
        return resultHtml;
    }

    function displayResult(message) {
        resultContainer.innerHTML = message;
        resultContainer.style.marginTop = '20px';
        resultContainer.style.padding = '10px';
        resultContainer.style.backgroundColor = '#f9f9f9';
        resultContainer.style.border = '1px solid #ddd';
        resultContainer.style.borderRadius = '5px';
        resultContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    }
});
