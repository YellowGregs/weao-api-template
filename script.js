const fetch_api = (route) => {
    return fetch(`https://weao-proxy-api.vercel.app/api/${route}`)
        .then(response => response.json());
};

const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
        case 'windows':
            return '<i class="fab fa-windows platform-icon"></i>';
        case 'mac':
            return '<i class="fab fa-apple platform-icon"></i>';
        case 'android':
            return '<i class="fab fa-android platform-icon"></i>';
        default:
            return '';
    }
};

const getFreeIcon = (isFree) => {
    return isFree;
};

const getDetectedIcon = (isDetected) => {
    return isDetected ? '<i class="fas fa-exclamation-triangle status-icon"></i>' : '<i class="fas fa-shield-alt status-icon"></i>';
};

const createCard = (title, details, extra) => {
    const card = document.createElement('div');
    card.className = 'version-card';
    card.innerHTML = `
        <h3>${title}</h3>
        <p>${details}</p>
        <div class="details">
            <span>Version:</span> <span>${extra.version}</span>
        </div>
    `;
    return card;
};

const Card = (exploit) => {
    const card = document.createElement('div');
    card.className = exploit.updateStatus ? 'exploit-card status-updated' : 'exploit-card status-not-updated';
    const platformIcon = getPlatformIcon(exploit.platform);
    const freeIcon = getFreeIcon(exploit.free);
    const detectedIcon = getDetectedIcon(exploit.detected);
    card.innerHTML = `
        <h3>${exploit.title}</h3>
        <p><strong>Version:</strong> ${exploit.version}</p>
        <p><strong>Updated Date:</strong> ${exploit.updatedDate}</p>
        <p><strong>Platform:</strong> ${platformIcon}${exploit.platform}</p>
        <p><strong>Free:</strong> ${exploit.free ? 'Yes' : 'No'} </p>
        <p><strong>Detected:</strong> ${detectedIcon} ${exploit.detected ? 'Yes' : 'No'}</p>
        <div class="details">
            <span>Status:</span> <span class="status-slash-command">${exploit.updateStatus ? 'Updated' : 'Not Updated'}</span>
        </div>
        <div class="cta">
            <a href="${exploit.websitelink}" target="_blank">Visit Site</a>
            <a href="${exploit.discordlink}" target="_blank" class="discord-link">
                <i class="fab fa-discord"></i> Join Discord
            </a>
        </div>
    `;
    return card;
};

fetch_api('versions/current')
    .then(data => {
        const container = document.getElementById('current-versions');
        container.innerHTML = '';
        container.appendChild(createCard('Windows', `Version: ${data.Windows}<br>Date: ${data.WindowsDate}`, { version: data.Windows }));
        container.appendChild(createCard('Mac', `Version: ${data.Mac}<br>Date: ${data.MacDate}`, { version: data.Mac }));
    })
    .catch(error => console.error('Error fetching current versions:', error));

fetch_api('versions/future')
    .then(data => {
        const container = document.getElementById('future-versions');
        container.innerHTML = '';
        container.appendChild(createCard('Windows', `Version: ${data.Windows}<br>Date: ${data.WindowsDate}`, { version: data.Windows }));
        container.appendChild(createCard('Mac', `Version: ${data.Mac}<br>Date: ${data.MacDate}`, { version: data.Mac }));
    })
    .catch(error => console.error('Error fetching future versions:', error));

fetch_api('status/exploits')
    .then(data => {
        const exploitStatus = document.getElementById('exploit-status');
        exploitStatus.innerHTML = '';
        data.forEach(exploit => {
            exploitStatus.appendChild(Card(exploit));
        });
    })
    .catch(error => console.error('Error fetching exploit statuses:', error));

fetch_api('versions/android')
    .then(data => {
        const container = document.getElementById('android-version');
        container.innerHTML = '';
        container.appendChild(createCard('Android', `Version: ${data.Android}<br>Date: ${data.AndroidDate}`, { version: data.Android }));
    })
    .catch(error => console.error('Error fetching Android version:', error));
