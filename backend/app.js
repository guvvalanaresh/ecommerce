import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import appRoutes from './routes/app.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';
import itemRoutes from './routes/item.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import userRoutes from './routes/user.routes.js';
import couponRoutes from './routes/coupon.routes.js';
import reviewRoutes from './routes/review.routes.js';
import supportRoutes from './routes/support.routes.js';
import errorHandler from './middleware/error.middleware.js';
import config from './config/index.js';


const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/app', appRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/restaurants', reviewRoutes);
app.use('/api/v1/support', supportRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use(errorHandler);

const port = config.port;

app.listen(port, () => console.log(`Server listening on port ${port}`));


// Now server is running fine on port 8000