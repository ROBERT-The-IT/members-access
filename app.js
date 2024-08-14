const validUsers = {
    "member1": "password1",
    "innovative": "group",
    "member": "group"
    
};    

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loading = document.getElementById('login-loading');
    loading.style.display = 'block'; // Show loading spinner
    document.getElementById('login-loading').style.display = 'block';

    // Simulate a delay for loading spinner demonstration
    setTimeout(() => {
        if (validUsers[username] && validUsers[username] === password) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('member-content').style.display = 'block';
            showSection('dashboard');
        } else {
            alert('Invalid username or password: If the problem persist kindly consult Group ICT Admin');
        }
        loading.style.display = 'none'; // Hide loading spinner
    }, 1000); // Adjust the delay as needed
});

document.getElementById('logout').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('member-content').style.display = 'none';
});

document.getElementById('dashboard-link').addEventListener('click', function() {
    showSection('dashboard');
});

document.getElementById('leadership-link').addEventListener('click', function() {
    showSection('leadership');
});

document.getElementById('all-members-link').addEventListener('click', function() {
    showSection('all-members');
});

document.getElementById('projects-link').addEventListener('click', function() {
    showSection('projects');
});

document.getElementById('economics-link').addEventListener('click', function() {
    showSection('economics');
});

document.getElementById('publications-link').addEventListener('click', function() {
    showSection('publications');
});

document.getElementById('submitRequest').addEventListener('click', function() {
    const memberName = document.getElementById('memberName').value;
    const requestType = document.getElementById('requestType').value;
    const loading = document.getElementById('loading');
    document.getElementById('loading').style.display = 'block'; // Show loading spinner

    fetch(`https://script.google.com/macros/s/AKfycbyIP_HJdOhlslMs3_XPUjPVJZaZ_DIK50Vk1bmjl8bffBbWgV83ysOGy_ReE-RL-4uH/exec?memberName=${memberName}&requestType=${requestType}`)
        .then(response => response.json())
        .then(data => {
            if (requestType === 'balance') {
                document.getElementById('results').innerHTML = `<p>Balance for ${memberName}: ${data.Balance}</p>`;
            } else {
                let table = '<table><tr><th>Save Date</th><th>Record Date</th><th>Amount</th><th>Transfers</th><th>Mpesa Sms</th><th>KCB Sms</th></tr>';
                table += `<tr class="special-row"><td colspan="6">${memberName}' ACCOUNT FOR THE FINANCIAL YEAR 2024</td></tr>`;
    
                data.Transactions.forEach(transaction => {
              
                    table += `<tr><td>${transaction.Save_Date}</td><td>${transaction.Record_Date}</td><td>${transaction.Amount}</td><td>${transaction.Transfers}</td><td>${transaction.Mpesa_Sms}</td><td>${transaction.KCB_Sms}</td></tr>`;
                
                });   
                table += '</table>';
                table += `<tr><td colspan="6" class="total">TOTAL: ${data.Balance}</td></tr>`;
                table += '</tbody></table>';
                document.getElementById('results').innerHTML = `<p>Full Statement for ${memberName}:            TOTAL:  ${data.Balance}</p>` + table;
                document.getElementById('downloadPdf').style.display = 'block';
                
                resultsDiv.innerHTML += table;
                document.getElementById('downloadPdf').style.display = 'block';
            }
            loading.style.display = 'none'; // Hide loading spinner
        
           
    
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = 'none'; // Hide loading spinner
        });
});
        document.getElementById('downloadPdf').addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text(document.getElementById('results').innerText, 10, 10);
            doc.save('statement.pdf');
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('#content > div');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}
