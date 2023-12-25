import express from 'express';
import connectDB from './config/dbConnection.js';
import songRoutes from './routes/songRoutes.js';

const app = express();
app.use(express.json());
app.use('/api', songRoutes);
const PORT = process.env.PORT || 3000;

try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (e) {
    console.log(`Failed to establish mongo connection ${e}`);
}