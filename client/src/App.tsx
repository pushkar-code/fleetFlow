import React from 'react';
import { Layout } from './components/Layout';
import { DataTable } from './components/DataTable';
import { StatusPill, StatusType } from './components/StatusPill';
import { FormInput } from './components/FormInput';
import { Modal } from './components/Modal';

function App() {
  const [isModalOpen, setModalOpen] = React.useState(false);

  // Mock data to demonstrate the reusable components
  const mockVehicles = [
    { id: 'v-1', model: 'Ford Transit 250', plate: 'ABC-1234', status: 'AVAILABLE' as StatusType },
    { id: 'v-2', model: 'Mercedes Sprinter', plate: 'XYZ-9876', status: 'ON_TRIP' as StatusType },
    { id: 'v-3', model: 'Chevy Express', plate: 'LMN-4567', status: 'IN_SHOP' as StatusType },
  ];

  const columns = [
    { key: 'model', header: 'Model' },
    { key: 'plate', header: 'License Plate' },
    {
      key: 'status',
      header: 'Status',
      render: (row: typeof mockVehicles[0]) => <StatusPill status={row.status} />
    }
  ];

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Welcome to FleetFlow (Dev 1 Demo)</h2>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>Add Vehicle</button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Reusable DataTable Component</h3>
        <DataTable data={mockVehicles} columns={columns} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Vehicle"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => setModalOpen(false)}>Save Vehicle</button>
          </>
        }
      >
        <FormInput label="Vehicle Model" placeholder="e.g. Ford Transit 250" />
        <FormInput label="License Plate" placeholder="e.g. ABC-1234" />
        <FormInput label="Max Capacity (kg)" type="number" placeholder="1000" />
      </Modal>
    </Layout>
  );
}

export default App;
