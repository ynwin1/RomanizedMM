import createApp from "./app.js"
import connectDB from './config/dbConnection.js';

const PORT = process.env.PORT || 4321;

try {
    const app = createApp();
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (e) {
    console.log(`Failed to establish mongo connection ${e}`);
}