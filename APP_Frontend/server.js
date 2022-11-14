const app = require("./app");
const port = process.env.PORT

// App is listening to the provided port .
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});