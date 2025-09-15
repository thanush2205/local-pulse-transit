import { Request, Response } from 'express';
import Bus, { IBus } from '../models/Bus';
import Route, { IRoute } from '../models/Route';
import Alert, { IAlert } from '../models/Alert';

export const getBuses = async (req: Request, res: Response) => {
  try {
    const buses: IBus[] = await Bus.find({});
    res.status(200).json(buses);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAdminDashboardData = async (req: Request, res: Response) => {
  try {
    const [buses, routes, alerts] = await Promise.all([
      Bus.find({}),
      Route.find({}),
      Alert.find({}),
    ]);

    const fleetStats = {
      totalBuses: buses.length,
      activeBuses: buses.filter(b => b.status !== 'maintenance').length,
      avgOccupancy: buses.reduce((acc, b) => acc + b.occupancy, 0) / buses.length,
      onTimePerformance: (buses.filter(b => b.status === 'on-time').length / buses.length) * 100,
      totalRoutes: routes.length,
      alerts: alerts.length
    };

    res.status(200).json({ fleetStats, buses, routes, alerts });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};