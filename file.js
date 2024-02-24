fetch('http://localhost:3000/status',{
    method: 'GET',
    headers: {
        'Content-Type': 'application',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoibXNlcnJvdWtAc3R1ZGVudC4xMzM3Lm1hIiwidXNlck5hbWUiOiJtc2Vycm91ayIsImlhdCI6MTcwODU0OTA2MywiZXhwIjoxNzA4NjM1NDYzfQ.NbAqHmCrRtLF6Z-psHp_H9KlYNuxd20WEzbhKutE47U'
    }

})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log('Error:', error));