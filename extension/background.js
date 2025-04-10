browser.browserAction.onClicked.addListener((tab) => {
	if (!tab.url) return;

	fetch('http://localhost:3000/api/save', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ url: tab.url }),
	})
		.then((res) => {
			if (res.ok) {
				browser.tabs.remove(tab.id);
			} else {
				console.error('Failed to send URL', res.statusText);
			}
		})
		.catch((err) => console.error('Fetch error', err));
});
