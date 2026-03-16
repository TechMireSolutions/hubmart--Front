import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // In production, replace with your frontend URL
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.send('HubMart Real-Time Engine is running!');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a specific room based on the user type (admin or client)
  socket.on('join', (role) => {
    if (role === 'admin') {
      socket.join('admins');
      console.log(`User ${socket.id} joined admins room`);
    } else {
      socket.join('clients');
      console.log(`User ${socket.id} joined clients room`);
    }
  });

  // Example Event: Placing an order
  socket.on('new_order', (orderData) => {
    console.log('New order received:', orderData);
    // Notify all admins about the new order
    io.to('admins').emit('order_notification', {
      message: 'New order has been placed!',
      order: orderData,
      timestamp: new Date()
    });
  });

  // Example Event: Client messages support
  socket.on('client_message', (payload) => {
    console.log('Client support message:', payload);
    // Broadcast to all admins
    io.to('admins').emit('receive_message', {
      user: payload.user,
      message: payload.message,
      clientId: socket.id,
      timestamp: new Date()
    });
  });

  // Example Event: Updating stock
  socket.on('stock_update', (productData) => {
    console.log('Stock update:', productData);
    // Notify all clients and admins about stock changes
    io.emit('stock_changed', {
      productId: productData.id,
      newStock: productData.stock,
      message: `Stock updated for ${productData.name}`
    });
  });

  // Example Event: Admin messages client
  socket.on('admin_message', (payload) => {
    // payload: { clientId, message }
    io.to(payload.clientId).emit('receive_message', {
      admin: 'HubMart Admin',
      message: payload.message
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`🚀 Real-Time Engine running on http://localhost:${PORT}`);
});
