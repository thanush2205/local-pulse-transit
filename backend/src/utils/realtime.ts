import { Server as SocketIOServer } from 'socket.io';
import Bus, { IBus } from '../models/Bus';

// This is a placeholder for real-time data logic.
// In a real application, data would be pushed from GPS devices.
const mockBusDataUpdates = async (io: SocketIOServer) => {
  setInterval(async () => {
    const buses: IBus[] = await Bus.find({});
    const updatedBuses = buses.map(bus => {
      // Simulate data changes
      bus.eta = Math.max(0, bus.eta - 1);
      bus.occupancy = Math.min(100, Math.max(10, bus.occupancy + Math.floor(Math.random() * 10 - 5)));
      bus.lat = bus.lat + (Math.random() - 0.5) * 0.001;
      bus.lng = bus.lng + (Math.random() - 0.5) * 0.001;
      return bus;
    });

    // Save the updated buses to the database (optional, for persistence)
    for (const bus of updatedBuses) {
      await Bus.findByIdAndUpdate(bus._id, bus);
    }
    
    // Broadcast the updated bus data to all connected clients
    io.emit('busUpdate', updatedBuses);
  }, 3000); // Send updates every 3 seconds
};

const setupRealtime = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Start mocking data updates
  mockBusDataUpdates(io);
};

export default setupRealtime;