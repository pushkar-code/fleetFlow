import { create } from 'zustand';
import { type StatusType } from '../components/StatusPill';

// --- Type Definitions ---
export interface Vehicle {
    id: string;
    model: string;
    license_plate: string;
    type: 'TRUCK' | 'VAN' | 'BIKE';
    region: string;
    capacity_kg: number;
    odometer_km: number;
    acquisition_cost: number;
    status: StatusType;
}

export interface Driver {
    id: string;
    name: string;
    license_expiry: string;
    license_category: 'TRUCK' | 'VAN' | 'BIKE';
    safety_score: number;
    status: StatusType;
}

export interface Trip {
    id: string;
    vehicle_id: string;
    driver_id: string;
    cargo_weight: number;
    expected_revenue: number;
    origin: string;
    destination: string;
    status: StatusType;
}

export interface Log {
    id: string;
    vehicle_id: string;
    log_type: 'FUEL' | 'MAINTENANCE';
    cost: number;
    liters?: number;
    description?: string;
    date_logged: string;
}

// --- Zustand Store Interface ---
interface FleetState {
    vehicles: Vehicle[];
    drivers: Driver[];
    trips: Trip[];
    logs: Log[];

    // Actions
    addVehicle: (v: Omit<Vehicle, 'id' | 'status'>) => void;
    updateVehicleStatus: (id: string, status: StatusType) => void;
    addDriver: (d: Omit<Driver, 'id' | 'status'>) => void;
    dispatchTrip: (t: Omit<Trip, 'id' | 'status'>) => void;
    completeTrip: (id: string, newOdometer: number) => void;
    addLog: (l: Omit<Log, 'id'>) => void;
}

// --- Initial Mock Data ---
const MOCK_VEHICLES: Vehicle[] = [
    { id: 'v-1', model: 'Ford Transit 250', license_plate: 'ABC-1234', type: 'VAN', region: 'North', capacity_kg: 1500, odometer_km: 45000, acquisition_cost: 35000, status: 'AVAILABLE' },
    { id: 'v-2', model: 'Chevy Express', license_plate: 'XYZ-9876', type: 'VAN', region: 'South', capacity_kg: 1200, odometer_km: 80000, acquisition_cost: 28000, status: 'IN_SHOP' },
    { id: 'v-3', model: 'Mack Anthem', license_plate: 'TRK-5555', type: 'TRUCK', region: 'North', capacity_kg: 15000, odometer_km: 125000, acquisition_cost: 150000, status: 'ON_TRIP' },
];

const MOCK_DRIVERS: Driver[] = [
    { id: 'd-1', name: 'Alex Johnson', license_expiry: '2027-05-12', license_category: 'VAN', safety_score: 98, status: 'AVAILABLE' },
    { id: 'd-2', name: 'Sarah Smith', license_expiry: '2026-10-15', license_category: 'TRUCK', safety_score: 100, status: 'ON_TRIP' },
    { id: 'd-3', name: 'Mike Davis', license_expiry: '2023-01-01', license_category: 'VAN', safety_score: 85, status: 'SUSPENDED' },
];

const MOCK_TRIPS: Trip[] = [
    { id: 't-1', vehicle_id: 'v-3', driver_id: 'd-2', cargo_weight: 12000, expected_revenue: 4500, origin: 'Warehouse A', destination: 'Store 42', status: 'DISPATCHED' },
    { id: 't-2', vehicle_id: 'v-1', driver_id: 'd-1', cargo_weight: 800, expected_revenue: 300, origin: 'Store 1', destination: 'Store 2', status: 'COMPLETED' }
];

const MOCK_LOGS: Log[] = [
    { id: 'l-1', vehicle_id: 'v-1', log_type: 'FUEL', cost: 120.50, liters: 65, date_logged: '2026-02-20T10:00:00Z' },
    { id: 'l-2', vehicle_id: 'v-2', log_type: 'MAINTENANCE', cost: 850.00, description: 'Engine knocking, replaced timing belt.', date_logged: '2026-02-21T08:00:00Z' }
];

export const useFleetStore = create<FleetState>((set) => ({
    vehicles: MOCK_VEHICLES,
    drivers: MOCK_DRIVERS,
    trips: MOCK_TRIPS,
    logs: MOCK_LOGS,

    addVehicle: (vehicleData) => set((state) => ({
        vehicles: [...state.vehicles, { ...vehicleData, id: `v-${Date.now()}`, status: 'AVAILABLE' }]
    })),

    updateVehicleStatus: (id, status) => set((state) => ({
        vehicles: state.vehicles.map(v => v.id === id ? { ...v, status } : v)
    })),

    addDriver: (driverData) => set((state) => ({
        drivers: [...state.drivers, { ...driverData, id: `d-${Date.now()}`, status: 'ON_DUTY' }]
    })),

    dispatchTrip: (tripData) => set((state) => {
        const newTrip: Trip = { ...tripData, id: `t-${Date.now()}`, status: 'DISPATCHED' };
        const updatedVehicles = state.vehicles.map(v => v.id === tripData.vehicle_id ? { ...v, status: 'ON_TRIP' as StatusType } : v);
        const updatedDrivers = state.drivers.map(d => d.id === tripData.driver_id ? { ...d, status: 'ON_TRIP' as StatusType } : d);
        return { trips: [...state.trips, newTrip], vehicles: updatedVehicles, drivers: updatedDrivers };
    }),

    completeTrip: (id, newOdometer) => set((state) => {
        const trip = state.trips.find(t => t.id === id);
        if (!trip) return state;
        const updatedTrips = state.trips.map(t => t.id === id ? { ...t, status: 'COMPLETED' as StatusType } : t);
        const updatedVehicles = state.vehicles.map(v => v.id === trip.vehicle_id ? { ...v, status: 'AVAILABLE' as StatusType, odometer_km: newOdometer } : v);
        const updatedDrivers = state.drivers.map(d => d.id === trip.driver_id ? { ...d, status: 'ON_DUTY' as StatusType } : d);
        return { trips: updatedTrips, vehicles: updatedVehicles, drivers: updatedDrivers };
    }),

    addLog: (logData) => set((state) => {
        const newLog = { ...logData, id: `l-${Date.now()}` };

        // Auto-Logic: Logging Maintenance puts the vehicle 'IN_SHOP' globally
        let updatedVehicles = state.vehicles;
        if (logData.log_type === 'MAINTENANCE') {
            updatedVehicles = state.vehicles.map(v => v.id === logData.vehicle_id ? { ...v, status: 'IN_SHOP' as StatusType } : v);
        }

        return { logs: [newLog, ...state.logs], vehicles: updatedVehicles };
    })
}));
