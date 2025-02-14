const express = require('express');
const app = express();
const PORT = process.env.c || 3000;

app.get('/', (req, res) => {
    res.send('서버가 정상적으로 동작하고 있습니다.');
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});